import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';
import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { BehaviorSubject } from 'rxjs/Rx';
// import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventSource = [];
  events = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };



  constructor( private launchNavigator: LaunchNavigator, private databaseprovider: DatabaseProvider, private platform: Platform , public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public localNotifications: LocalNotifications) {



    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadEventData();
      }
    })
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        console.log(eventData);

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        this.databaseprovider.addEvent(eventData.title, eventData.type, eventData.startTime, eventData.endTime, eventData.allDay, /*latitude_, longitude_  */ eventData.adresse)
         .then(data => {
           this.loadEventData();
         });

      }
    });
  }

  loadEventData() {
    this.databaseprovider.getAllEvents().then(data => {
      setTimeout(() => {
          this.events = data;
            for (var i = 0; i < this.events.length; i++) {

              this.localNotifications.schedule({
                title: 'Agenda',
                text: 'Evenement : '+this.events[i].title + ' commence dans 1h',
                trigger: {at: new Date(this.events[i].startTime.getTime() - 3600000)},
                led: 'FF0000',
                sound: null
              });
            }
        });
    });
  }

  Localiser(adresse) {
    this.launchNavigator.navigate(adresse)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }


  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');


    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: <br>' + start + '<br>To: <br>' + end + '<br> adresse : '+ event.adresse,
      buttons: [{
        text:'Localiser',
        handler: () => {
          this.Localiser(event.adresse);
        }
      },
      'OK'
    ]});
    alert.present();
  }



  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
