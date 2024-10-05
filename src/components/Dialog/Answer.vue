<script setup lang="ts">
import { storeToRefs } from "pinia";

import Triangle from "@/assets/triangle.svg";
import { useTextStore } from "@/store";

const textStore = useTextStore();
const { answer } = storeToRefs(textStore);
</script>

<template>
  <div class="answer-wrapper">
    <div class="triangle">
      <Triangle />
    </div>
    <div class="answer-container">
      {{ answer }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.answer-wrapper {
  position: absolute;
  left: 188.15px;
  width: 160px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #535353;
  display: flex;

  .triangle {
    position: absolute;
    top: 37.5px;
    left: -20px;
  }

  .answer-container {
    background-color: #fff;
    box-shadow: 0px 0px 22px 0 rgba(154, 190, 255, 0.56);
    backdrop-filter: blur(13.59px);
    padding: 21px 16px 9px 24px;
    max-height: 210px;
    overflow-y: auto;
    border-radius: 10px;
  }
}
</style>
