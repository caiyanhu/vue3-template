<script setup lang="ts">
import AP from "@/assets/ap_button.svg";
import Distributed from "@/assets/distributed_button.svg";
import MySQL from "@/assets/mysql_button.svg";
import PostgreSQL from "@/assets/pg_button.svg";
</script>

<template>
  <div class="w-full pt-[3.5rem] pb-0 px-[1.875rem]">
    <div class="flex justify-between mb-[1rem]">
      <MySQL />
      <PostgreSQL />
    </div>
    <div class="flex justify-between">
      <AP />
      <Distributed />
    </div>
  </div>
</template>
