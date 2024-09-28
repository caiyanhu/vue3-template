<script setup lang="ts">
import { Recorder, TextArea } from "@/components";
</script>

<template>
  <div
    class="w-screen h-screen fixed bottom-0 flex flex-col justify-center items-center bg-homeBottom">
    <TextArea />
    <Recorder />
  </div>
</template>
