import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AudioRecorderService } from '../../services/audio-recorder.service';
import { PlatformService } from '../../services/platform.service';
import { NativeAudioRecorderService } from '../../services/native-audio-recorder.service';
import { MediaFile } from '@awesome-cordova-plugins/media-capture';

@Component({
  selector: 'app-audio-recording',
  templateUrl: './audio-recording.component.html',
  styleUrls: ['./audio-recording.component.scss'],
})
export class AudioRecordingComponent implements OnInit, OnDestroy {

  @ViewChild('audioElement', { static: true }) audioElement: ElementRef
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>

  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private bufferLength: number;
  private source: MediaElementAudioSourceNode;
  private animationId: number;
  //
  public isPlaying: boolean = false


  //

  //
  public isRecording: boolean = false
  audio = new Audio()
  audioUrl: any
  audioBlob: any

  isNative: boolean = false

  nativeAudioFile: string = ''


  constructor(
    private modalCtrl: ModalController,
    private platformService: PlatformService,
    private audioRecordingService: AudioRecorderService,
    //private nativeAudioRecorderService: NativeAudioRecorderService,
  ) { }

  ngOnInit() {
    ''

    if (this.platformService.isWeb()) {
      this.isNative = false
    } else if (this.platformService.isMobile()) {
      this.isNative = true
    }
  }

  ngOnDestroy() {

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.audioContext) {
      this.audioContext.close();
    }




  }

  private setupAudioContext(audioElement: HTMLAudioElement) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.source = this.audioContext.createMediaElementSource(audioElement) //oder (this.audioElement.nativeElement)
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.draw();

    this.isPlaying = true
  }

  private draw() {
    const canvasCtx = this.canvas.nativeElement.getContext('2d');
    const WIDTH = this.canvas.nativeElement.width;
    const HEIGHT = this.canvas.nativeElement.height;

    if (canvasCtx) {

      const drawVisual = () => {
        this.animationId = requestAnimationFrame(drawVisual);

        this.analyser.getByteFrequencyData(this.dataArray);

        canvasCtx.fillStyle = 'white' //'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / this.bufferLength) * 2.5;
        let barHeight;
        let x = 2;

        for (let i = 0; i < this.bufferLength; i++) {
          barHeight = this.dataArray[i];
          canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
         // canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
          canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
          x += barWidth + 1;
        }
      }

      drawVisual()
    }

  }

  playPause$() {
    const audio = this.audioElement.nativeElement;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  close() {
    this.modalCtrl.dismiss({ audio: this.audio, audioUrl: this.audioUrl, audioBlob: this.audioBlob }, 'audio')
  }


  // local record
  async startRecording() {
    this.isRecording = true
    if (!this.isNative) {
      this.audioRecordingService.startRecording()
    } else {
      //this.startNativeRecording()
    }
  }

  async stopRecording() {
    this.isRecording = false
    if (!this.isNative) {
      this.audioRecordingService.stopRecording()
    } else {
      // this.stopNativeRecording()
    }
  }

  buildAudio() {
    const audioBlob = this.audioRecordingService.getAudioBlob()
    const audioUrl = URL.createObjectURL(audioBlob)
    this.audioUrl = audioUrl
    this.audioBlob = audioBlob
  }

  playRecording() {
    if (!this.isNative) {
      this.buildAudio()
      this.audio = new Audio(this.audioUrl)
      console.log(`Audio: ${this.audio} , ${this.audioBlob} , ${this.audioUrl}`)
      this.audio.play()
      this.setupAudioContext(this.audio)


    } else {

    }

  }




  // native
  /*
  async startNativeRecording() {
    try {
      const mediaFiles = await this.nativeAudioRecorderService.startRecording()
      if (mediaFiles && mediaFiles.length > 0) {
        const audioFiles: MediaFile[] = mediaFiles
        this.nativeAudioFile = audioFiles[0].fullPath
        console.log('Native Audio recorded:', this.nativeAudioFile)
      }
    } catch (error) {
      throw error
    }

  }

  async stopNativeRecording() {
    this.audio.pause()
  }

  playNativeRecording() {
    this.audio = new Audio(this.nativeAudioFile)
    this.audio.play()
  }*/




}
