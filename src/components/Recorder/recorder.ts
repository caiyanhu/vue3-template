class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private isRecording: boolean = false;
  private isDestroyed: boolean = false;

  // 开始录音
  public async startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return Promise.reject(new Error("当前浏览器不支持录音功能"));
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);

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
      if (err instanceof DOMException && err.NOT_FOUND_ERR) {
        throw new Error("未发现录音设备");
      }
      console.error("录音初始化失败: ", err);
      throw err;
    }
  }

  // 停止录音并返回录音文件
  public stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.onstop = () => {
          // 录音停止后，将数据拼接成一个音频 Blob
          const audioBlob = new Blob(this.chunks, { type: "audio/wav" });
          resolve(audioBlob);
        };
        this.mediaRecorder.stop();
        this.cleanup();
        this.isRecording = false;
        this.isDestroyed = true;
      } else {
        reject(new Error("录音器尚未启动"));
      }
    });
  }

  // 取消录音
  public cancelRecording() {
    if (!this.mediaRecorder || !this.isRecording || this.isDestroyed) return;

    this.mediaRecorder.stop();
    this.cleanup();
    this.isRecording = false;
  }

  // 清理资源
  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.chunks = [];
  }
}

export default AudioRecorder;
