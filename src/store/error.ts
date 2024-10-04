import { defineStore } from "pinia";
import { ref } from "vue";

const useErrorStore = defineStore("error", () => {
  const message = ref("说话时间太短");
  const isMessagePopupVisible = ref(false);

  return { message, isMessagePopupVisible };
});

export default useErrorStore;
