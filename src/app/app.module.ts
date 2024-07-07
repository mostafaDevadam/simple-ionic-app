import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkService } from './shared/services/network.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NativeNetworkService } from './shared/services/native-network.service';
import { NativeStorageService } from './shared/services/native-storage.service';
import { PreferencesService } from './shared/services/preferences.service';
import { PlatformService } from './shared/services/platform.service';
import { ToastUIService } from './shared/services/toast-ui.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NetworkService,
    LocalStorageService,
    NativeNetworkService,
    NativeStorageService,
    PreferencesService,
    PlatformService,
    // ui
    ToastUIService,


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
