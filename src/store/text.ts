import { defineStore } from "pinia";
import { ref } from "vue";

const useTextStore = defineStore("text", () => {
  const question = ref("");
  const answer = ref(
    "你好呀，我是库库，代表移动云数据库的安全可靠和先进技术。你也可以点击按钮和我对话哦～",
  );

  return { answer, question };
});

export default useTextStore;
