import { App, Directive } from "vue";

import longPressDirective from "@/directives/longPress";
import multiTouchDirective from "@/directives/multiTouch";

const directiveList: Record<string, Directive> = {
  longPress: longPressDirective,
  multiTouch: multiTouchDirective,
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directiveList).forEach((key) => {
      // 注册自定义指令
      app.directive(key, directiveList[key] as Directive);
    });
  },
};

export default directives;
