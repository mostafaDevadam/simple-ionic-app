import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Capacitor } from '@capacitor/core'
import { Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class NativeCameraService {

  photo: string = ''

  selectedImage: string = ''

  constructor() { }

  async takePhoto() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    })

    if (Capacitor.getPlatform() == 'web') {
      this.photo = image.webPath!!
    } else {
      const path = image.path?.replace('file://', '')
      this.photo = path!!
    }

    return this.photo
  }

  clearPhoto() {
    this.photo = ''
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    })

    if (Capacitor.getPlatform() == 'web') {
      this.selectedImage = image.webPath!!
    } else {
      const path = image.path?.replace('file://', '')
      this.selectedImage = path!!
    }

    return this.selectedImage
  }

  async uploadImage(): Promise<any> {
    if (!this.selectedImage) {
      return
    }

    try {
      const fileUri = this.selectedImage
      const response = await Filesystem.readFile({ path: fileUri })
      console.log(`reponse uploadImage : ${response}`)
      if (response.data) {
        return response.data
      }

    } catch (error) {
      console.log(`error uploadImage : ${error}`)
    }
  }


}
