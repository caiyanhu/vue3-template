<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useTextStore } from "@/store";

const textStore = useTextStore();
const { answer } = storeToRefs(textStore);
</script>

<template>
  <div
    class="w-[10.75rem] h-[13.125rem] bg-answer bg-cover pl-[1.5rem] pr-[1rem] pt-[1.25rem] pb-[0.625rem] text-[#535353]">
    {{ answer }}
  </div>
</template>
