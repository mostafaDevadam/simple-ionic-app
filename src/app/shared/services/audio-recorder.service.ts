import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private mediaRecorder: MediaRecorder
  private chunks: any[] = []
  private audioBlob: Blob


  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private bufferLength: number;
  private source: MediaStreamAudioSourceNode;
  private animationId: number;

  private canvas: HTMLCanvasElement

  constructor() {
    console.log(`AudioRecorderService...`)
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // source
        if (this.audioContext && this.analyser) {
          this.source = this.audioContext.createMediaStreamSource(stream);
          this.source.connect(this.analyser);
        }


        //
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.start()

        this.mediaRecorder.ondataavailable = (event) => {
          this.chunks.push(event.data)
        }

        this.mediaRecorder.onstop = () => {
          this.audioBlob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus ' })
          this.chunks = []
        }
      })
      .catch(err => {
        console.error(`Error accessing mic: ${err}`)
      })
  }

  stopRecording() {
    this.mediaRecorder.stop()
    this.source.disconnect()
    this.analyser.disconnect()
  }

  getAudioBlob(): Blob {
    return this.audioBlob
  }

  // visualizer for recording

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  setupAudioContext(canvas: HTMLCanvasElement) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.canvas = canvas

    this.draw()
  }

  private draw() {
    const canvasCtx = this.canvas.getContext('2d');
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;

    if (canvasCtx) {

      const drawVisual = () => {
        this.animationId = requestAnimationFrame(drawVisual);

        this.analyser.getByteFrequencyData(this.dataArray);

        canvasCtx.fillStyle = 'white' //'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / this.bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
          barHeight = this.dataArray[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
          //canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
          canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

          x += barWidth + 1;
        }
      };

      drawVisual();

    }


  }


}
