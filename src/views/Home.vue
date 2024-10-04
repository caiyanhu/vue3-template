<script setup lang="ts">
import { HomeBottom, HomeMiddle, HomeTop } from "@/components";
</script>

<template>
  <div class="wraper">
    <HomeTop />
    <HomeMiddle />
    <HomeBottom />
  </div>
</template>

<style lang="scss" scoped>
.wraper {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("images/home_background.svg");
}
</style>
