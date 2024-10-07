<script setup lang="ts">
import { storeToRefs } from "pinia";

import { HomeBottom, HomeMiddle, HomeTop, MessagePopup } from "@/components";
import { useErrorStore } from "@/store";

const errorMsgStore = useErrorStore();
const { isMessagePopupVisible, message } = storeToRefs(errorMsgStore);

// 关闭错误信息弹窗
const closeMessagePopup = () => {
  errorMsgStore.reset();
};

// 禁止显示右键菜单
document.addEventListener(
  "contextmenu",
  function (event: MouseEvent | TouchEvent) {
    event.preventDefault();
  },
);
</script>

<template>
  <div class="wrapper">
    <HomeTop />
    <HomeMiddle />
    <HomeBottom />
    <MessagePopup
      @close="closeMessagePopup"
      :message="message"
      :duration="1.5"
      :visible="isMessagePopupVisible" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("images/home_background.svg");
}
</style>
