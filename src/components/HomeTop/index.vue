<script setup lang="ts">
import { useRouter } from "vue-router";

import ButtonArrow from "@/assets/button_arrow.svg";

const firstRow = [
  {
    name: "MySQL版",
    link: "/mysql",
  },
  {
    name: "PostgreSQL版",
    link: "/pg",
  },
];
const secondRow = [
  {
    name: "数仓版",
    link: "/ap",
  },
  {
    name: "分布式版",
    link: "/distributed",
  },
];

const router = useRouter();

type ClickItem = {
  name: string;
  link: string;
};
const handleClick = (item: ClickItem) => {
  router.push(item.link);
};
</script>

<template>
  <div class="home-top">
    <div class="first-row">
      <div
        class="button"
        v-for="item in firstRow"
        :key="item.name"
        @click="() => handleClick(item)">
        <span>{{ item.name }}</span>
        <ButtonArrow />
      </div>
    </div>
    <div class="second-row">
      <div
        class="button"
        v-for="item in secondRow"
        :key="item.name"
        @click="() => handleClick(item)">
        <span>{{ item.name }}</span>
        <ButtonArrow />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-top {
  width: 100%;
  padding: 56px 30px 0;
  position: relative;
  z-index: 10;

  .first-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .second-row {
    display: flex;
    justify-content: space-between;
  }

  .button {
    width: 157.01px;
    height: 44px;
    background-image: url("../../assets/button_background.svg");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    text-align: center;

    svg {
      position: absolute;
      right: 9px;
    }
  }
}
</style>
