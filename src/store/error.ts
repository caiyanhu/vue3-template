import { defineStore } from "pinia";
import { ref } from "vue";

const useErrorStore = defineStore("error", () => {
  const message = ref("说话时间太短");
  const isMessagePopupVisible = ref(false);

  const reset = () => {
    message.value = "说话时间太短";
    isMessagePopupVisible.value = false;
  };
  return { message, isMessagePopupVisible, reset };
});

export default useErrorStore;
