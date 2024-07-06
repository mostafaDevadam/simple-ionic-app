import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private mediaRecorder: MediaRecorder
  private chunks: any[] = []
  private audioBlob: Blob

  constructor() {
    console.log(`AudioRecorderService...`)
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
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
  }

  getAudioBlob(): Blob {
    return this.audioBlob
  }


}
