import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastUIService {

  constructor(private toastCtrl: ToastController,) { }


  async presentToast(message: string, position: string = 'top') {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      positionAnchor: 'header',
      duration: 3000,
    })

    await toast.present()
  }

}
