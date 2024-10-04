<script setup lang="ts">
import { Recorder, TextArea } from "@/components";
</script>

<template>
  <div class="home-bottom">
    <TextArea />
    <Recorder />
  </div>
</template>

<style lang="scss" scoped>
.home-bottom {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("images/home_background_bottom.svg");
  background-size: cover;
}
</style>
