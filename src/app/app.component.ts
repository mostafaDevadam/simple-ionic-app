import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NetworkService } from './shared/services/network.service';
import { Platform } from '@ionic/angular';
import { NativeNetworkService } from './shared/services/native-network.service';
import { NativeStorageService } from './shared/services/native-storage.service';
import { PreferencesService } from './shared/services/preferences.service';
import { PlatformService } from './shared/services/platform.service';
import { ToastUIService } from './shared/services/toast-ui.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private networkService: NetworkService,
    private platform: Platform,
    private nativeNetworkService: NativeNetworkService,
    private preferencesService: PreferencesService,
    private platformService: PlatformService,
    // ui
    private toastUIService: ToastUIService,
  ) { }

  async ngOnInit() {

    console.log(`Capacitor.getPlatform : ${Capacitor.getPlatform()}`)

    const formData = new FormData()

    if (this.platformService.isWeb()) {
      // check internet-connection
      this.networkService.getNetworkState().subscribe(state => {
        //this.isConnected = state
        // web network online
        console.log('web network connection:', state)
        // display toast-ui for native network-connection
        this.toastUIService.presentToast(` Network connection ${state ? 'online' : 'offline'}`)
        if (state) {
          // get data from local-storage
          const data = this.localStorageService.getItem('DATA')
          // formData
          formData.append('image', data.image)
          formData.append('audio', data.audio)
          formData.append('info', data.info)
          // send the data to the server


          // remove data from storage
          this.localStorageService.removeItem('DATA')
        }
      })
    } else if (this.platformService.isMobile()) {
      // check native network-connection
      // if state is false then save into native-storage else send to server
      this.nativeNetworkService.getNetworkState().subscribe( async state => {
        if (state) {
          console.log('native network connection:', state)
          // native network online
          // display toast-ui for native network-connection
          this.toastUIService.presentToast(` Network connection ${state ? 'online' : 'offline'}`)

          // get data from native-storage
          const data = await this.preferencesService.getItem('DATA')
          // formData
          formData.append('image', data.image)
          formData.append('audio', data.audio)
          formData.append('info', data.info)
          // send the data to the server

          // remove data from native-storage
          this.preferencesService.removeItem('DATA')
        }
      })


    }
  }


  /*
    check platform:
        A-web:
          check internet-connection is true
            then get data from local-storage and send it to server and  remove data from storage
        B-mobile:
          check native-internet-connection is true
            then get data from  native-storage and send to server and remove data from storage
   */

}
