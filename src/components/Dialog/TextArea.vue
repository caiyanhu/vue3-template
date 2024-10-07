<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { requestAnswer } from "@/apis";
import { useTextStore, useVisibleStore } from "@/store";
import { getDeviceType } from "@/utils/device";

const textStore = useTextStore();
const visibleStore = useVisibleStore();
const { question } = storeToRefs(textStore);

// 是否允许发送
const isSubmitAllowed = computed(() => {
  return question.value.length > 0;
});

// 清空输入
const resetTextArea = () => {
  textStore.$patch((state) => {
    state.question = "";
  });
};

// 将文案请求到AI
const submit = async () => {
  if (question.value.length === 0) return;
  const result = await requestAnswer(question.value);
  textStore.$patch((state) => {
    state.answer = result;
  });
};

const inputField = ref<HTMLElement | null>(null);

const toggleHomeMiddleVisibility = (isVisible = true) => {
  visibleStore.$patch((state) => {
    state.isHomeMiddleVisible = isVisible;
  });
};

const handleFocus = () => {
  setTimeout(() => {
    // 键盘弹出时页面高度变小,隐藏中间内容
    toggleHomeMiddleVisibility(false);
  }, 100); // 延迟处理,等待键盘完全弹出
};

const handleBlur = () => {
  toggleHomeMiddleVisibility(true);
};

onMounted(() => {
  // 因为Android与ios在唤起键盘时对webview高度处理不同,所以需要区分机型
  if (getDeviceType().isAndroid) {
    let originHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    // 安卓手机中唤起软键盘时页面会压缩webview的高度，窗口会执行resize事件
    window.addEventListener(
      "resize",
      function () {
        const resizeHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (originHeight < resizeHeight) {
          // Android 键盘收起
          handleBlur();
        } else {
          // Android 键盘弹出
          handleFocus();
        }
        originHeight = resizeHeight;
      },
      false,
    );
  }
  if (getDeviceType().isIOS && inputField.value) {
    // ios在唤起键盘时webview不会被压缩,整体往上滚动
    inputField.value.addEventListener("focus", handleFocus);
    inputField.value.addEventListener("blur", handleBlur);
  }
});

onBeforeUnmount(() => {
  if (inputField.value) {
    inputField.value.removeEventListener("focus", handleFocus);
    inputField.value.removeEventListener("blur", handleBlur);
  }
});
</script>

<template>
  <div class="wrapper">
    <textarea
      type="text"
      ref="inputField"
      placeholder="您可以通过输入或按下按钮说话的方式向我提问"
      v-model="question"
      rows="4" />
    <div class="buttons">
      <button
        style="color: #697ffe"
        @click="resetTextArea">
        清空
      </button>
      <button
        :style="`${isSubmitAllowed ? 'color: #697ffe;' : 'color: #ccc;'}`"
        :disabled="!isSubmitAllowed"
        @click="submit">
        发送
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-image: url("../../assets/textArea.png");
  background-size: cover;
  position: absolute;
  bottom: 46.66px;
  width: 340px;
  height: 266.85px;
  margin: 0 auto;
  padding: 64px 34px 0;

  textarea {
    width: 100%;
    background-color: #fff;
    color: #3b3b3b;
    outline-width: 0;

    &:focus {
      border-width: 0;
    }

    &::-webkit-input-placeholder {
      color: #3b3b3b;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
