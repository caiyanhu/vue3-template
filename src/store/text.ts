import { defineStore } from "pinia";
import { ref } from "vue";

const useTextStore = defineStore("text", () => {
  const question = ref("");
  const answer = ref("");

  return { answer, question };
});

export default useTextStore;
