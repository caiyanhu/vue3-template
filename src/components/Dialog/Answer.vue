<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useTextStore } from "@/store";

const textStore = useTextStore();
const { answer } = storeToRefs(textStore);
</script>

<template>
  <div class="answer-wrapper">
    {{ answer }}
  </div>
</template>

<style scoped lang="scss">
.answer-wrapper {
  width: 172px;
  height: 210px;
  background-image: url("../../../public/images/answer_background.svg");
  background-size: cover;
}
</style>
