import { Component, OnInit } from '@angular/core';
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
export class AudioRecordingComponent implements OnInit {

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

  close() {
    this.modalCtrl.dismiss({ audio: this.audio, audioUrl: this.audioUrl, audioBlob: this.audioBlob }, 'audio')
  }

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
    } else {
      //this.playNativeRecording()
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
