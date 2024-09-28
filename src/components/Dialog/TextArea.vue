<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { requestAnswer } from "@/apis";
import { useTextStore } from "@/store";

const textStore = useTextStore();
const { question } = storeToRefs(textStore);

// 是否允许发送
const isSubmitAllowed = computed(() => {
  return question.value.length > 0;
});

// 清空输入
const resetTextArea = () => {
  textStore.$patch((state) => {
    state.question = "";
  });
};

// 将文案请求到AI
const submit = async () => {
  if (question.value.length === 0) return;
  const result = await requestAnswer(question.value);
  textStore.$patch((state) => {
    state.answer = result;
  });
};
</script>

<template>
  <div
    class="bg-textArea absolute bottom-[2.91625rem] w-[21.25rem] h-[16.678125rem] mx-auto my-0 px-[2.125rem] pt-[4rem] pb-0">
    <textarea
      class="w-full bg-white text-[#3b3b3b] outline-0 focus:border-0 placeholder:text-[#3b3b3b]"
      type="text"
      id="inputField"
      placeholder="您可以通过输入或按下按钮说话的方式向我提问"
      v-model="question"
      rows="4" />
    <div class="flex justify-between items-center">
      <button
        class="text-[#697ffe]"
        @click="resetTextArea">
        清空
      </button>
      <button
        :class="`${isSubmitAllowed ? 'text-[#697ffe]' : 'text-[#ccc]'}`"
        :disabled="!isSubmitAllowed"
        @click="submit">
        发送
      </button>
    </div>
  </div>
</template>
