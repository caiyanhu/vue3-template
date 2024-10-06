import type { Directive, DirectiveBinding } from "vue";

interface CustomElement extends HTMLElement {
  _onDestroy: () => void;
}

const multiTouchDirective: Directive = {
  beforeMount(el: CustomElement, binding: DirectiveBinding) {
    let lastTouchTime = 0; // 上一次触摸的时间
    let touchCount = 0; // 触摸次数
    const touchThreshold = 300; // 定义触摸间隔阈值（毫秒）

    const handleTouchEnd = () => {
      const currentTime = new Date().getTime();
      touchCount++;

      if (touchCount === 1) {
        lastTouchTime = currentTime;
      } else if (touchCount >= 3) {
        if (currentTime - lastTouchTime < touchThreshold) {
          binding.value(); // 调用传入的处理函数
          touchCount = 0; // 重置触摸计数
        } else {
          touchCount = 1; // 超过阈值，重置为1
          lastTouchTime = currentTime;
        }
      }

      // 超过阈值后重置计数器
      setTimeout(() => {
        touchCount = 0;
      }, touchThreshold);
    };

    el.addEventListener("touchend", handleTouchEnd);

    // 清理事件监听器
    el._onDestroy = () => {
      el.removeEventListener("touchend", handleTouchEnd);
    };
  },
  unmounted(el: CustomElement) {
    if (el._onDestroy) {
      el._onDestroy();
    }
  },
};

export default multiTouchDirective;
