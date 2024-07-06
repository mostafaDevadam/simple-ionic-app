import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private onlineState = new BehaviorSubject<boolean>(navigator.onLine)

  constructor() {
    window.addEventListener('online', () => this.updateOnLineState(true))
     window.addEventListener('offline', () => this.updateOnLineState(false))
  }

  private updateOnLineState(state: boolean) {
    this.onlineState.next(state)
  }

  public getNetworkState(): Observable<boolean> {
    return this.onlineState.asObservable()
  }
}
