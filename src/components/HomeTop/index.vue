<script setup lang="ts">
import ButtonArrow from "@/assets/button_arrow.svg";
</script>

<template>
  <div class="home-top">
    <div class="first-row">
      <div class="button">
        <span>MySQL版</span>
        <ButtonArrow />
      </div>
      <div class="button">
        <span>PostgreSQL版</span>
        <ButtonArrow />
      </div>
    </div>
    <div class="second-row">
      <div class="button">
        <span>数仓版</span>
        <ButtonArrow />
      </div>
      <div class="button">
        <span>分布式版</span>
        <ButtonArrow />
      </div>
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
