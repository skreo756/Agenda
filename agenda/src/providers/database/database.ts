import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage,
     private sqlite: SQLite , private platform: Platform, private http: Http) {
       this.databaseReady = new BehaviorSubject(false);
       this.platform.ready().then(() => {
         this.sqlite.create({
           name: 'evenements.db',
           location: 'default'
         })
          .then((db: SQLiteObject) => {
            this.database = db;
            this.storage.get('database_filled').then(val => {
              if (val) {
             this.databaseReady.next(true);
             // this.fillDatabase();
              } else {
                this.fillDatabase();
              }
            });
          });
       });
     }


     fillDatabase() {
       this.http.get('assets/base.sql')
        .map(res => res.text())
        .subscribe(sql => {
          this.sqlitePorter.importSqlToDb(this.database, sql)
            .then(data => {
              this.databaseReady.next(true);
              this.storage.set('database_filled' , true);
            })
            .catch(e => console.error(e));
        });
     }

     addEvent(title, type, startTime, endTime, allDay , adresse) {
       let data = [title , type, startTime, endTime , allDay, adresse];
       return this.database.executeSql("INSERT INTO evenements(title, type, startTime, endTime , allDay, adresse) VALUES (?, ?, ?, ?, ?, ?)", data).then(data => {
         return data;
       }, err => {
         console.log('Error: l61', err);
         return err;
       })
     }

     getAllEvents() {
    return this.database.executeSql("SELECT * FROM evenements", []).then((data) => {
      let events = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let all_day: boolean = false;
          if (data.rows.item(i).allDay == "false") {
            all_day = false;
          }
          else {
            all_day = true;
          }

          let start_Time = new Date(data.rows.item(i).startTime);
          let end_Time = new Date(data.rows.item(i).endTime);
          events.push({ title: data.rows.item(i).title, type: data.rows.item(i).type, startTime: start_Time, endTime: end_Time, allDay: all_day, adresse: data.rows.item(i).adresse /* latitude: data.rows.item(i).latitude, longitude: data.rows.item(i).longitude */ });
        }
      }
      return events;
    }, err => {
      console.log('Error: l76', err);
      return [];
    });
  }

     getDatabaseState() {
       return this.databaseReady.asObservable();
     }

}
