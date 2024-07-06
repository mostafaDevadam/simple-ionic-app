import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AudioRecorderService } from '../../services/audio-recorder.service';

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


  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private audioRecordingService: AudioRecorderService,
  ) { }

  ngOnInit() {
    ''
  }

  close() {
    this.modalCtrl.dismiss({ audio: this.audio, audioUrl: this.audioUrl, audioBlob: this.audioBlob }, 'audio')
  }

  async startRecording() {
    this.isRecording = true
    this.audioRecordingService.startRecording()

  }

  async stopRecording() {
    this.isRecording = false
    this.audioRecordingService.stopRecording()
  }

  buildAudio() {
    const audioBlob = this.audioRecordingService.getAudioBlob()
    const audioUrl = URL.createObjectURL(audioBlob)
    this.audioUrl = audioUrl
    this.audioBlob = audioBlob
  }

  playRecording() {
    this.buildAudio()
    this.audio = new Audio(this.audioUrl)
    console.log(`Audio: ${this.audio} , ${this.audioBlob} , ${this.audioUrl}`)
    this.audio.play()
  }


}
