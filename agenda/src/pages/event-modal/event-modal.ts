import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';

// import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  images = [];

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, image:"" };
  minDate = new Date().toISOString();

  constructor( public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, private camera: Camera) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

   getPictures(){
     const options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
       sourceType: 0
  }

    this.camera.getPicture(options).then((imageData) => {

      console.log(imageData);
      this.event.image = imageData;
      }, (err) => {
        console.log("erreur");
      });

    }

    takePicture(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: 1
   }

     this.camera.getPicture(options).then((imageData) => {

       console.log(imageData);
       this.event.image = imageData;
       }, (err) => {
         console.log("erreur");
       });

     }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
