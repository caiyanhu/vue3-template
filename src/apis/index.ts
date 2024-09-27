// import RPCClient from "@alicloud/pop-core";
import axios from "axios";

async function ASR_voice(blob: Blob) {
  const url = `/stream/v1/asr?appkey=mjfewXjiA56WMRqU`;

  const headers = {
    "X-NLS-Token": `c15fcc38f8194084b40cd392e73ca28a`,
  };
  const formData = new FormData();
  formData.append("file", blob, "1.wav");

  try {
    const response = await axios.post(url, formData, { headers: headers });
    return response.data?.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { ASR_voice };
