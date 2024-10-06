<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useVisibleStore } from "@/store";

import Answer from "../Dialog/Answer.vue";
import Model from "./Model.vue";

const visibleStore = useVisibleStore();
const { isHomeMiddleVisible } = storeToRefs(visibleStore);
</script>

<template>
  <div
    class="home-middle"
    v-if="isHomeMiddleVisible">
    <Model />
    <Answer />
  </div>
</template>

<style scoped lang="scss">
.home-middle {
  width: 100%;
  height: 268px;
  margin-top: 48px;
  display: flex;
  position: relative;
  z-index: 10;
}
</style>
