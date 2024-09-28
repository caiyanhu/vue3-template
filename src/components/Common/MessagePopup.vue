<script setup lang="ts">
import { onBeforeMount, watch } from "vue";

import Exclamation from "@/assets/exclamation.svg";

const props = defineProps({
  message: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["close"]);

// eslint-disable-next-line
let timeoutId: NodeJS.Timeout | null = null;

// 组件销毁时清除定时器
onBeforeMount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      // 如果弹窗打开,设置定时器,duration后自动关闭
      timeoutId = setTimeout(() => {
        emit("close");
      }, props.duration * 1000);
    } else if (timeoutId) {
      // 如果弹窗关闭,清除定时器
      clearTimeout(timeoutId);
    }
  },
);
</script>

<template>
  <div
    v-if="visible"
    class="popup-overlay">
    <div class="popup-content">
      <slot>
        <Exclamation style="width: 28px; height: 28px; margin-bottom: 16px" />
        <div>
          {{ message }}
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999; /* 弹窗遮罩层的 z-index，确保在内容上方 */
}

.popup-content {
  box-sizing: border-box;
  background-color: #404040;
  transition: 0.3s;
  position: fixed;
  max-width: calc(100vw - 32px);
  width: fit-content;
  margin: 0 auto;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  padding: 64px;
  border-radius: 16px;
  color: #fff;
  z-index: 1000; /* 弹窗本身的 z-index，应该高于遮罩层 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
