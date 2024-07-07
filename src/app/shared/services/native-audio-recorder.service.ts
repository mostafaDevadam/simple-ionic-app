import { Inject, Injectable } from '@angular/core';
import { MediaCapture, MediaFile, CaptureAudioOptions } from '@awesome-cordova-plugins/media-capture';


@Injectable({
  providedIn: 'root'
})
export class NativeAudioRecorderService {

  constructor() { }


  async startRecording(): Promise<MediaFile[] | Array<any> | any> {
    const options: CaptureAudioOptions = { limit: 1 }
    try {
      const mediaFiles = await MediaCapture.captureAudio(options)
      if (mediaFiles && mediaFiles instanceof Array) {
        return mediaFiles
      }
    } catch (error) {
      throw error
    }
  }
}
