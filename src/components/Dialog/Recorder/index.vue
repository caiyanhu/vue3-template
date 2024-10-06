<script setup lang="ts">
import { ref } from "vue";

import RecorderIcon from "@/assets/recorder.svg";
import { useErrorStore } from "@/store";

import AudioRecorder from "./AudioRecorder.ts";

const errorMsgStore = useErrorStore();
// 是否展示声纹动画
const isVoiceAnimationVisible = ref(false);

const recorder = new AudioRecorder();

/**
 * 按钮点击时,展示动画，开始录音
 */
const handleStart = () => {
  if (recorder.hasPermission) {
    isVoiceAnimationVisible.value = true;
    recorder.startRecording();
  } else {
    errorMsgStore.$patch((state) => {
      state.isMessagePopupVisible = true;
      state.message = recorder.permissionErrorMessage;
    });
  }
};

/**
 * 按钮松开时,动画消失.如果录音对象还在,结束录音
 */
const handleEnd = () => {
  isVoiceAnimationVisible.value = false;
  recorder.stopRecording();
};

/**
 * 提示时间短,动画消失,取消录音
 */
const handleShortPress = () => {
  isVoiceAnimationVisible.value = false;

  // 当录音器获得授权之后,短按才触发提示"说话时间太短"
  if (recorder.hasPermission) {
    errorMsgStore.$patch((state) => {
      state.isMessagePopupVisible = true;
      state.message = "说话时间太短";
    });
  }

  recorder.cancelRecording();
};
</script>

<template>
  <div class="wrapper">
    <div
      :class="`recorder-icon ${isVoiceAnimationVisible ? 'bg-voiceWave' : 'bg-voiceWaveInit'}`">
      <RecorderIcon
        v-long-press="{
          handleStart,
          handleEnd,
          handleShortPress,
        }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px;

  .recorder-icon {
    display: flex;
    justify-content: center;
    position: relative;
    background-size: cover;
    background-position: top;
  }
}
</style>
