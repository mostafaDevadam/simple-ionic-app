import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private platform: Platform) { }

  isMobile(): boolean {
    return this.platform.is('mobile')
  }

  isWeb(): boolean {
    return this.platform.is('hybrid') || this.platform.is('mobileweb')
  }
}
