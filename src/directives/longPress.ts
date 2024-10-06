import type { Directive, DirectiveBinding } from "vue";

import { isTouchDevice } from "@/directives/utils";

type DirectiveBindingValue = {
  handleStart: () => void;
  handleEnd: () => void;
  handleLongPress?: () => void;
  handleShortPress: () => void;
};

interface CustomElement extends HTMLElement {
  start: () => void;
  cancel: () => void;
}

const longPressDirective: Directive = {
  mounted(el: CustomElement, binding: DirectiveBinding<DirectiveBindingValue>) {
    // 阈值,默认1000s
    const duration = binding.arg ? parseInt(binding.arg, 10) : 1000;
    let pressTimer: NodeJS.Timeout | null = null;
    // 跟踪是否触发了长按
    let hasLongPressed = false;

    // 开始计时函数
    el.start = () => {
      binding.value.handleStart();

      if (pressTimer === null) {
        hasLongPressed = false;

        pressTimer = setTimeout(() => {
          hasLongPressed = true;
          if (binding.value.handleLongPress) {
            binding.value.handleLongPress();
          }
        }, duration);
      }
    };

    // 清除计时器函数
    el.cancel = () => {
      if (pressTimer != null) {
        clearTimeout(pressTimer);
        pressTimer = null;

        if (!hasLongPressed) {
          binding.value.handleShortPress();
        } else {
          binding.value.handleEnd();
        }
      }
    };

    // 事件监听
    if (isTouchDevice()) {
      el.addEventListener("touchstart", el.start);

      el.addEventListener("touchend", el.cancel);
      el.addEventListener("touchcancel", el.cancel);
    } else {
      el.addEventListener("mousedown", el.start);

      el.addEventListener("mouseup", el.cancel);
    }
  },
  beforeUnmount(el: CustomElement) {
    // 解除事件绑定
    if (isTouchDevice()) {
      el.removeEventListener("touchstart", el.start);

      el.removeEventListener("touchend", el.cancel);
      el.removeEventListener("touchcancel", el.cancel);
    } else {
      el.removeEventListener("mousedown", el.start);

      el.removeEventListener("mouseup", el.cancel);
    }
  },
};

export default longPressDirective;
