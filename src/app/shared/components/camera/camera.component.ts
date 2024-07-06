import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit, AfterViewInit {

  @ViewChild("video") video: ElementRef
  @ViewChild("canvas") canvas: ElementRef
  public captureImg: any
  public isWebCam: boolean = false

  constructor(
    private modalCtrl: ModalController,
    private cameraService: CameraService,
  ) { }

  ngOnInit() {
    ''
  }

  ngAfterViewInit(): void {
    this.init_webCam()
  }

  close() {
    this.modalCtrl.dismiss()
  }

  // camera
  init_webCam() {
    this.cameraService.init_webCam(this.video.nativeElement)
    //this.isWebCam = true
  }

  capture$() {
    this.captureImg = this.cameraService.capture$(this.video.nativeElement, this.canvas.nativeElement)
    //this.isWebCam = false
    console.log(`captureImg: ${this.captureImg}`)
    this.modalCtrl.dismiss({ image: this.captureImg },'camera')
  }

}
