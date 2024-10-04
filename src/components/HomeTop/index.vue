<script setup lang="ts">
import AP from "@/assets/ap_button.svg";
import Distributed from "@/assets/distributed_button.svg";
import MySQL from "@/assets/mysql_button.svg";
import PostgreSQL from "@/assets/pg_button.svg";
</script>

<template>
  <div class="home-top">
    <div class="first-row">
      <MySQL />
      <PostgreSQL />
    </div>
    <div class="second-row">
      <AP />
      <Distributed />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-top {
  width: 100%;
  padding: 56px 30px 0;

  .first-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .second-row {
    display: flex;
    justify-content: space-between;
  }
}
</style>
