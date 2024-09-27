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

// async function getToken() {
//   const client = new RPCClient({
//     accessKeyId: "LTAI5tB68RVGv3SEPDcTAR87",
//     accessKeySecret: "gBIgC7A8k2jC0yX1T4U3IaI3lipI3e",
//     endpoint: "http://nls-meta.cn-shanghai.aliyuncs.com",
//     apiVersion: "2019-02-28",
//   });
//
//   type Result = {
//     Token: {
//       Id: string;
//       ExpireTime: string;
//     };
//   };
//   const result: Result = await client.request("CreateToken", {});
//   return result.Token.Id;
// }

export { ASR_voice };
