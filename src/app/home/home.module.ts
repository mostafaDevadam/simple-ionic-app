import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserFormComponent } from '../shared/components/user-form/user-form.component';
import { AudioRecorderService } from '../shared/services/audio-recorder.service';
import { CameraComponent } from '../shared/components/camera/camera.component';
import { AudioRecordingComponent } from '../shared/components/audio-recording/audio-recording.component';
import { NetworkService } from '../shared/services/network.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UserFormComponent, CameraComponent, AudioRecordingComponent],
  providers: [AudioRecorderService,],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class HomePageModule { }
