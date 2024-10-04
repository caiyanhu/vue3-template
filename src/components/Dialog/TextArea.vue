<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { requestAnswer } from "@/apis";
import { useTextStore } from "@/store";

const textStore = useTextStore();
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
</script>

<template>
  <div class="wrapper">
    <textarea
      type="text"
      id="inputField"
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
  background-image: url("../../assets/textArea.svg");
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
