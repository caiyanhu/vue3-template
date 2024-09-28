class AudioRecorder {
  private mediaRecorder: MediaRecorder | null;
  private chunks: Blob[];
  private stream: MediaStream | null;
  // 是否录音中
  private isRecording: boolean;
  // 是否被授权
  public hasPermission: boolean | null;

  constructor() {
    this.mediaRecorder = null;
    this.chunks = [];
    this.stream = null;

    this.isRecording = false;
    this.hasPermission = null;
  }

  // 开始录音
  public async startRecording() {
    // 判断设备支持情况
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return Promise.reject(new Error("当前浏览器不支持录音功能"));
    }

    // 当用户拒绝授权后，再次开始录音前将授权状态置空,让设备再次去请求权限
    if (this.hasPermission === false) {
      this.clearCookies();
      return Promise.reject(new Error("授权被拒绝,请重新进入页面"));
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.hasPermission = true;

      // 清空上次的录音数据
      this.chunks = [];

      // 监听数据回传
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      // 开始录音
      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.name === "NotFoundError") {
          throw new Error("未发现录音设备");
        }
        if (err.name === "NotAllowedError") {
          this.hasPermission = false;
          throw new Error("授权被拒绝");
        }
      }
      console.error("录音初始化失败: ", err);
      throw err;
    }
  }

  // 停止录音并返回录音文件
  public stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.onstop = () => {
          // 录音停止后,将数据拼成一个音频Blob
          const audioBlob = new Blob(this.chunks, { type: "audio/wav" });
          resolve(audioBlob);
        };
        this.cleanup();
      }
    });
  }

  // 取消录音
  public cancelRecording() {
    if (!this.mediaRecorder || !this.isRecording) {
      return;
    }

    this.cleanup();
  }

  // 清理资源
  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    this.mediaRecorder?.stop();
    this.mediaRecorder = null;
    this.chunks = [];
    this.isRecording = false;
  }

  // 清理cookie
  private clearCookies() {
    const date = new Date();
    date.setTime(date.getTime() - 10000);
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      for (let i = keys.length; i--; )
        document.cookie =
          keys[i] + "=0; expire=" + date.toString() + "; path=/";
    }
  }
}

export default AudioRecorder;
