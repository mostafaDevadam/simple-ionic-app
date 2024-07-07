import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AudioRecorderService } from '../../services/audio-recorder.service';
import { CameraService } from '../../services/camera.service';
import { CameraComponent } from '../camera/camera.component';
import { AudioRecordingComponent } from '../audio-recording/audio-recording.component';
import { NetworkService } from '../../services/network.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NativeNetworkService } from '../../services/native-network.service';
import { NativeStorageService } from '../../services/native-storage.service';
import { PreferencesService } from '../../services/preferences.service';
import { PlatformService } from '../../services/platform.service';
import { ToastUIService } from '../../services/toast-ui.service';
import { NativeCameraService } from '../../services/native-camera.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {

  public infoForm: FormGroup

  public files: HTMLInputElement | any

  public image_url: any
  // record audio
  public isRecording: boolean = false
  public audioUrl: any
  public audio: any
  audioBlob: any
  audioFile = new Audio()
  nativeAudioFile: any


  // camera
  @ViewChild("video$") videoElement: ElementRef<HTMLVideoElement>
  @ViewChild("canvas$") canvasElement: ElementRef<HTMLCanvasElement>
  public capturedImg: any
  //
  @ViewChild("video") video: ElementRef
  @ViewChild("canvas") canvas: ElementRef

  public captures: any[] = []
  public captureImg: any

  imageFile: File

  // Gallery
  nativeImageFile: any

  //
  public isWebCam: boolean = false



  //
  premissionState: string = ''
  camData: any
  public capturedImage: any = ''
  public trigger: Subject<void> = new Subject()
  // network
  isConnected: boolean = false
  // form
  public isValid: boolean
  public isSubmitted: boolean = false

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private domSanitizer: DomSanitizer,
    private audioRecordingService: AudioRecorderService,
    private cameraService: CameraService,
    private platformService: PlatformService,
    private modalCtrl: ModalController,
    private networkService: NetworkService,
    private localStorageService: LocalStorageService,

    // native
    private nativeNetworkService: NativeNetworkService,
    private preferencesService: PreferencesService,
    private nativeCameraService: NativeCameraService,
    // ui
    private toastUIService: ToastUIService,
  ) { }

  ngOnInit() {
    this.initForm()

    if (this.platformService.isWeb()) {
      this.networkService.getNetworkState().subscribe(state => {
        this.isConnected = state
        console.log('web network connection:', state)
        // display toast-ui for web network-connection
        this.toastUIService.presentToast(` Network connection is ${state ? 'online' : 'offline'}`)
      })
    } else if (this.platformService.isMobile()) {
      this.nativeNetworkService.getNetworkState().subscribe(state => {
        this.isConnected = state
        console.log('native network connection:', state)
        // display toast-ui for native network-connection
        this.toastUIService.presentToast(` Network connection is ${state ? 'online' : 'offline'}`)
      })
    }

  }

  ngAfterViewInit() {
    ''
  }

  ngOnDestroy() {
    '' //this.stopCamera()
  }

  initForm() {
    this.infoForm = new FormGroup({
      image: new FormControl('' as any, Validators.compose([
        //Validators.required,
      ])),
      info: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
      ])),
      audio: new FormControl('', Validators.compose([
        //Validators.required,
      ])),
    })
  }


  public get infoFormControls() {
    return this.infoForm.controls
  }

  public async onSubmit() {
    this.isSubmitted = true
    console.log(`audio `, this.audioBlob, this.audioFile, this.audioUrl, this.audio)





    if (this.platformService.isWeb()) {
      let audio_data = JSON.stringify(this.audioBlob)
      this.infoForm.patchValue({ 'image': this.image_url })
      this.infoForm.patchValue({ 'audio': this.audioUrl })

    } else if (this.platformService.isMobile()) {
      this.nativeImageFile = await this.nativeCameraService.uploadImage()
      this.infoForm.patchValue({ 'image': this.image_url })
      this.infoForm.patchValue({ 'audio': this.audioUrl })
    }


    if (this.infoForm.valid) {
      const formdata = new FormData()
      //
      this.isValid = true
      console.log('Submitted Form:', this.infoForm.value, this.infoForm.value['info'])
      //localStorage.setItem('DATA', JSON.stringify(this.infoForm.value))
      // check platform
      // check internet-connection
      // else save into local-storage / native-storage

      //formdata.append('info', this.infoForm.value('info'))


      if (this.platformService.isWeb()) {

        // check internet-connection
        this.networkService.getNetworkState().subscribe(state => {
          this.isConnected = state
          console.log('web network connection:', state)
          if (!state) {
            // display toast-UI: web network offline
            this.toastUIService.presentToast(` Network connection is ${state ? 'online' : 'offline'}`)


            /*
             formdata.append('image', this.image_url)
             formdata.append('audio', this.audioUrl)
             */


            // save into local-storage : local-storage-service
            this.localStorageService.setItem('DATA', this.infoForm.value)

          } else {
            // send to server
            // // send to server: native-storage-service
          }
        })
      } else if (this.platformService.isMobile()) {
        // check native-network
        // if state is false then save into native-storage else send to server

        this.nativeNetworkService.getNetworkState().subscribe(state => {
          this.isConnected = state
          if (!state) {
            console.log('native network connection:', state)

            // display toast-UI: native network offline
            this.toastUIService.presentToast(` Network connection is ${state ? 'online' : 'offline'}`)


            //formdata.append('image', this.nativeImageFile)

            // save into native-storage/Preferences : native-storage-service /preferencesService
            this.preferencesService.setItem('DATA', this.infoForm.value)


          } else {
            // send to server
          }
        })

      }

    } else {
      this.isValid = false
      console.log('Form is invalid')
    }
  }

  public async openUpload(uploader: any) {
    this.presentActionSheet(uploader)
  }

  async presentActionSheet(uploader: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Camera',
          data: {
            action: 'upload'
          },
          handler: () => {
            // if platform != 'mobile' then display the camera-components else if it == 'mobile' open the native camera on mobile
            if (this.platformService.isWeb()) {
              this.presentModal(CameraComponent)
            } else if (this.platformService.isMobile()) {
              // open the native-camera on mobile
              this.image_url = this.nativeCameraService.takePhoto()
            }

          }
        },
        {
          text: 'Gallery',
          handler: async () => {
            // if platform is hybrid or mobile-web then :
            if (this.platformService.isWeb()) {
              uploader.click()
              console.log('gallery:', this.files, uploader)
            } else if (this.platformService.isMobile()) {
              // open gallery or file-manager on mobile
              this.image_url = this.nativeCameraService.selectImage()
              //this.nativeImageFile = await this.nativeCameraService.uploadImage() //.then((vl: any) => vl)

            }
          },
          data: {
            action: 'Gallery'
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel'
          }
        },

      ]
    })

    return await actionSheet.present()
  }

  public async uploadImage($event: any) {
    console.log('upload image:', $event.target.files[0], this.files)
    const file: File = $event.target.files[0]
    this.imageFile = file

    if (!file.type.match(/image-*/)) {
      //alert('Upload just image file, please!')
      // display toast top
      //this.presentToast('Upload just image file,please!')
      this.toastUIService.presentToast('Upload just image file,please!')
      return
    }

    const image_url = URL.createObjectURL(file)
    console.log('image url:', image_url)
    this.image_url = image_url

  }

  // camera
  init_webCam() {
    this.cameraService.init_webCam(this.video.nativeElement)
    this.isWebCam = true
  }

  capture$() {
    this.captureImg = this.cameraService.capture$(this.video.nativeElement, this.canvas.nativeElement)
    this.isWebCam = false
  }


  /*
    //
    checkPermission() {
      navigator.mediaDevices.getUserMedia({ video: { width: 500, height: 500 } })
        .then((response) => {
          this.premissionState = 'allowed'
          this.camData = response
          console.log('camData:', this.camData)
        }).catch(err => {
          this.premissionState = 'not allowed'
          console.log('permissionState:', this.premissionState)
        })
    }
  */



  // camera
  /*
  async startCamera(): Promise<void> {
    await this.cameraService.initCamera(this.videoElement.nativeElement)
  }

  stopCamera(): void {
    this.cameraService.stopCamera()
  }

  capturePhoto(): void {
    this.capturedImg = this.cameraService.capturePhoto(this.videoElement.nativeElement, this.canvasElement.nativeElement)
  }
*/


  // audio
  async startRecording() {
    this.isRecording = true
    this.audioRecordingService.startRecording()
  }

  async stopRecording() {
    this.isRecording = false
    this.audioRecordingService.stopRecording()
  }

  playRecording() {
    const audioBlob = this.audioRecordingService.getAudioBlob()
    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    console.log(`Audio: ${audio} , ${audioBlob} , ${audioUrl}`)
    audio.play()
  }



  /*
    sanitize(url: string) {
      return this.domSanitizer.bypassSecurityTrustUrl(url)
    }
  */

  openAudioRecording() {
    // props: isNative: true || false
    //is true then run native-recording else run web-recording
    // if platform is mobile then isNative=true else isNative=false

    if (this.platformService.isWeb()) {
      this.presentModal(AudioRecordingComponent, { isNative: false })
    } else if (this.platformService.isMobile()) {
      // native
      this.presentModal(AudioRecordingComponent, { isNative: true })
    }

  }

  async presentModal(component: any, props?: any) {
    const modal = await this.modalCtrl.create({
      component,
      componentProps: props,
    })

    this.getDataFromModalUI(modal)
    return await modal.present()
  }

  async getDataFromModalUI(modal: any) {
    const { data, role } = await modal.onWillDismiss()

    if (data) {
      console.log(`modal data: `, data, role)
      if (role === 'camera') {
        this.image_url = data.image
        this.infoForm.patchValue({ 'image': data.image })
      }

      if (role === 'audio') {
        if (!data.audio || !data.audioUrl || data.audioBlob) {
          // display toast top
          //alert('Could you record,please!')
          //this.presentToast('Could you record,please!')
          this.toastUIService.presentToast('Could you record,please!')
          return
        }
        this.audioUrl = data.audioUrl
        this.audio = data.audio
        this.audioFile = data.audio
        this.audioBlob = data.audioBlob
        this.infoForm.patchValue({ 'audio': data.audioBlob })
      }
    }
  }

  playAudio() {
    if (this.audio) {
      this.audio.play()
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audioFile.pause()
    }
  }





}
