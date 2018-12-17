import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

/**
 * Generated class for the EventViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {
  title:"";
  type:"";
  adresse:"";
  image:string;
  startTime: null;
  endTime: null;




  constructor(public viewCtrl: ViewController, private launchNavigator: LaunchNavigator, private sanitizer : DomSanitizer, private file: File, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.type = this.navParams.get('type');
    this.adresse = this.navParams.get('adresse');
    this.image = this.navParams.get('image');
    this.startTime = this.navParams.get('startTime');
    this.endTime = this.navParams.get('endTime');



      //  window.Ionic.WebView.convertFileSrc(this.image);
      //   this.sanitizer.bypassSecurityTrustUrl(this.image);

         console.log("image :");
         console.log(this.image);


    console.log(this.title);
    console.log(this.type);
    console.log(this.adresse);
    console.log(this.startTime);
    console.log(this.endTime);

  }

  Localiser(adresse) {
    this.launchNavigator.navigate(adresse)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
