<h1 align="center">Welcome to simple ionic app 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/simple ionic app" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/simple ionic app.svg">
  </a>


</p>

> simple ionic app has small form and it supports offline.
> The app check if the platform is mobile or not and after that check the network connection state in background
> User can enter his data in form and save it in local storage if the network connection is offline and if the network connection is online, then get the data from local-storage in device and send it to the server.

### 🏠 [Homepage](https://ionicframework.com/)

## Features
<ul>
<ol>1.take photo from camera</ol>
<ol>2.upload photo from device</ol>
<ol>3.record voice</ol>
<ol>4.It works offline and online</ol>
</ul>

## Structure


## main component
UserFormComponent:
> Using UserFormComponent in Home Page because it's reusable component.
> It has the form and fields and validations and created reusable components for camera and voice recording.



## reusable components
<ul>
<ol>1.AudioRecoding</ol>
<ol>2.Camera</ol>
</ul>

## services
Platform
Network
NativeNetwork
Camera
NativeCamera
AudioRecorder
NativeAudioRecorder
LocalStorage
Preferences(alternative NativeStorage)
ToastUI: display dynamic toast message in some of components like in network, form and for validation

## Install

Install Node.js version  20.11.1

Install Angular version 18
```sh
npm install @angular/cli
```


install ionic version 8
```sh
npm install @ionic/cli
```


```sh
npm install
```

## Usage

## Run Ionic App

```sh
ionic serve
```

## Run tests

```sh
npm run test
```

## Author

👤 **Mostafa Farrag**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
