import { App, Directive } from "vue";

import touchDirective from "@/directives/touch";

const directiveList: Record<string, Directive> = {
  touch: touchDirective,
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
