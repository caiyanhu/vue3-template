import axios, { AxiosError } from "axios";

// 将语音文件识别为文字
async function ASR_voice(blob: Blob) {
  const url = `/stream/v1/asr?appkey=mjfewXjiA56WMRqU`;

  const headers = {
    "X-NLS-Token": `8c179056f71b44fb8c2f7285c4caf05a`,
  };
  const formData = new FormData();
  formData.append("file", blob, "1.wav");

  try {
    type Response = {
      data: {
        message: string;
        result: string;
        status: number;
      };
    };
    const response: Response = await axios.post(url, formData, {
      headers: headers,
    });
    return response.data?.result;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.message;
    }
    return "";
  }
}

// 将文字形式的问题发送给AI回答
async function requestAnswer(question: string) {
  const url = `/chat/chat`;

  try {
    const response = await axios.post(url, {
      query: question,
      knowledge_base_name: "mysql-great",
      conversation_id: "",
      history_len: 20,
      history: [],
      stream: false,
      model_name: "openai-api",
      temperature: 1,
      max_tokens: 0,
      prompt_name: "default",
      system_role: "你是一名专业的DBA",
    });

    return response.data.text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { ASR_voice, requestAnswer };
