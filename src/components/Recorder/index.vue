<script setup lang="ts">
import { ref } from "vue";

import { ASR_voice } from "@/apis";
import RecorderIcon from "@/assets/recorder.svg";
import VoiceWave from "@/assets/voiceWave.webp";
import VoiceWaveStart from "@/assets/voiceWaveStart.png";
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

  // 将音频文件上传到语音转文字接口中
  await ASR_voice(audioBlob);
};

/**
 * 提示时间短,动画消失,取消录音
 */
const handleShortPress = () => {
  isMessagePopupVisible.value = true;
  isVoiceAnimationVisible.value = false;

  recorder.cancelRecording();
};
</script>

<template>
  <div class="absolute bottom-0 w-full h-[6.79125rem]">
    <div class="flex justify-center relative z-10">
      <RecorderIcon
        v-touch="{
          handleStart,
          handleEnd,
          handleShortPress,
        }" />
    </div>
    <div class="absolute bottom-0 z-0">
      <img :src="isVoiceAnimationVisible ? VoiceWave : VoiceWaveStart" />
    </div>
    <MessagePopup
      @close="isMessagePopupVisible = false"
      :message="message"
      :visible="isMessagePopupVisible" />
  </div>
</template>
