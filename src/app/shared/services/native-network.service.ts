import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NativeNetworkService {

  private networkState = new BehaviorSubject<boolean>(true)

  constructor() {
    this.initNetworkEvents()
  }

  private async initNetworkEvents() {
    const state = await Network.getStatus()
    this.networkState.next(state.connected)

    Network.addListener('networkStatusChange', (state$) => {
      this.networkState.next(state$.connected)
    })
  }

  public getNetworkState() {
    return this.networkState.asObservable()
  }
}
