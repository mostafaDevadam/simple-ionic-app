import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private stream: MediaStream

  constructor() { }

  async initCamera(videoElement: HTMLVideoElement) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoElement.src = ''
      videoElement.srcObject = this.stream
    } catch (error) {
      console.error(`Error accessing camera:  ${error}`)
    }

  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
    }
  }

  capturePhoto(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement): string {
    const context = canvasElement.getContext('2d')
    if (context) {
      canvasElement.width = videoElement.videoWidth
      canvasElement.height = videoElement.videoHeight
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height)
      return canvasElement.toDataURL('image/png')
    }
    return ''
  }


  init_webCam(video: HTMLVideoElement) {
    const mediaConstraints = {
      video: {
        width: 300, height: 300
      },
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia!!) {
      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then((stream) => {
          console.log('video stream:', stream)
          video.src = ''
          video.srcObject = stream
          video.play()
        })
    }
  }

  capture$(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    let context = canvas.getContext('2d')!!.drawImage(video, 0, 0, 200, 200)
    console.log('context:', context)
    const captureImg = canvas.toDataURL('image/png')
    console.log('this.captureImg:', captureImg)
    return captureImg
  }
}
