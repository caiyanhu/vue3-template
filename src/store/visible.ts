import { defineStore } from "pinia";
import { ref } from "vue";

const useVisibleStore = defineStore("visible", () => {
  const isHomeMiddleVisible = ref(true);

  return { isHomeMiddleVisible };
});

export default useVisibleStore;
