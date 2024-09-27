import type { Directive, DirectiveBinding } from "vue";

type DirectiveBindingValue = {
  handleStart: () => void;
  handleEnd: () => void;
  handleLongPress?: () => void;
  handleShortPress: () => void;
};

function isTouchDevice() {
  return navigator.maxTouchPoints > 0;
}

const touchDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<DirectiveBindingValue>) {
    // 阈值,默认2000s
    const duration = binding.arg ? parseInt(binding.arg, 10) : 2000;
    let pressTimer: NodeJS.Timeout | null = null;
    // 跟踪是否触发了长按
    let hasLongPressed = false;

    // 开始计时函数
    const start = () => {
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
    const cancel = () => {
      if (pressTimer != null) {
        clearTimeout(pressTimer);
        pressTimer = null;

        binding.value.handleEnd();

        if (!hasLongPressed) {
          binding.value.handleShortPress();
        }
      }
    };

    // 事件监听
    if (isTouchDevice()) {
      el.addEventListener("touchstart", start);

      el.addEventListener("touchend", cancel);
      el.addEventListener("touchcancel", cancel);
    } else {
      el.addEventListener("mousedown", start);

      el.addEventListener("mouseup", cancel);
    }
  },
};

export default touchDirective;
