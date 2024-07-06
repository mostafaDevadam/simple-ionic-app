import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NetworkService } from './shared/services/network.service';
import { Platform } from '@ionic/angular';

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
  ) { }

 async  ngOnInit() {
    if (this.platform.is('hybrid') || this.platform.is('mobileweb')) {
      // check internet-connection
      this.networkService.getNetworkState().subscribe(state => {
        //this.isConnected = state
        console.log('web network connection:', state)
        if (state) {
          // get data from local-storage
          const data = this.localStorageService.getItem('DATA')
          // send the data to the server

          // remove data from storage
          this.localStorageService.removeItem('DATA')
        }
      })
    } else if (this.platform.is('mobile')) {
      // check native-network
      // if state is false then save into native-storage else send to server

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
