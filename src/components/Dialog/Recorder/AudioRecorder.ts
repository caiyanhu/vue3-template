import { ASR_voice } from "@/apis";
import { useTextStore } from "@/store";

// 定义录音类
class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording: boolean = false;
  private audioBlob: Blob | null = null; // 用于存储最终的音频 Blob
  public hasPermission: boolean | null = null;
  public permissionErrorMessage: string = "";

  constructor() {
    this.init();
  }

  // 初始化方法，获取用户媒体权限
  private async init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.bindEvents();
      this.hasPermission = true;
      this.permissionErrorMessage = "";
    } catch (error) {
      if (error instanceof DOMException) {
        this.hasPermission = false;
        this.handlePermissionError(error);
      }
    }
  }

  // 处理权限错误
  private handlePermissionError(error: DOMException) {
    if (error.name === "NotAllowedError") {
      console.error("用户拒绝了麦克风访问权限。");
      this.permissionErrorMessage =
        "请允许访问麦克风以进行录音。\n重新扫码进入";
    } else if (error.name === "NotFoundError") {
      console.error("没有找到麦克风设备。");
      this.permissionErrorMessage = "未检测到麦克风设备。";
    } else {
      console.error("获取媒体权限失败:", error);
      this.permissionErrorMessage = "无法访问麦克风，请检查设备设置。";
    }
  }

  // 绑定事件
  private bindEvents() {
    if (this.mediaRecorder) {
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = async () => {
        this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" }); // 存储最终的音频 Blob
        const audioUrl = URL.createObjectURL(this.audioBlob);
        this.audioChunks = []; // 清空音频块
        this.playAudio(audioUrl); // 播放录音

        // 将音频文件上传到语音转文字接口中
        const result = await ASR_voice(this.audioBlob);
        // 将识别的结果存入store中
        const textStore = useTextStore();
        textStore.$patch((state) => {
          state.question = result;
        });
      };
    }
  }

  // 开始录音
  public startRecording() {
    if (this.mediaRecorder && !this.isRecording) {
      this.mediaRecorder.start();
      this.isRecording = true;
    }
  }

  // 停止录音
  public stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  // 取消录音（清空已录制的数据）
  public cancelRecording() {
    if (this.isRecording) {
      this.mediaRecorder?.stop();
      this.audioChunks = []; // 清空音频块
      this.isRecording = false;
    }
  }

  // 播放录制的音频
  private playAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.play();
  }
}

export default AudioRecorder;
