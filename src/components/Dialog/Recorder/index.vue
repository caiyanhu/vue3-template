<script setup lang="ts">
import { ref } from "vue";

import { ASR_voice } from "@/apis";
import RecorderIcon from "@/assets/recorder.svg";
import { MessagePopup } from "@/components";

import AudioRecorder from "./recorder.ts";

// 是否展示消息弹窗
const isMessagePopupVisible = ref(false);
const message = ref("说话时间太短");
// 是否展示声纹动画
const isVoiceAnimationVisible = ref(false);

const recorder = new AudioRecorder();

/**
 * 按钮点击时,展示动画，开始录音
 */
const handleStart = async () => {
  isVoiceAnimationVisible.value = true;
  try {
    await recorder.startRecording();
  } catch (error) {
    isMessagePopupVisible.value = true;
    if (error instanceof Error) {
      message.value = error.message;
    }
  }
};

/**
 * 按钮松开时,动画消失.如果录音对象还在,结束录音
 */
const handleEnd = async () => {
  isVoiceAnimationVisible.value = false;
  const audioBlob = await recorder.stopRecording();

  if (audioBlob.size > 0) {
    // 将音频文件上传到语音转文字接口中
    await ASR_voice(audioBlob);
  }
};

/**
 * 提示时间短,动画消失,取消录音
 */
const handleShortPress = () => {
  isVoiceAnimationVisible.value = false;

  // 当录音器获得授权之后,短按才触发提示"说话时间太短"
  if (recorder.hasPermission) {
    isMessagePopupVisible.value = true;
  }

  recorder.cancelRecording();
};
</script>

<template>
  <div class="absolute bottom-0 w-full h-[6.875rem]">
    <div
      :class="`flex justify-center relative bg-top bg-cover ${isVoiceAnimationVisible ? 'bg-voiceWave' : 'bg-voiceWaveInit'}`">
      <RecorderIcon
        v-touch="{
          handleStart,
          handleEnd,
          handleShortPress,
        }" />
    </div>
    <MessagePopup
      @close="isMessagePopupVisible = false"
      :message="message"
      :visible="isMessagePopupVisible" />
  </div>
</template>
