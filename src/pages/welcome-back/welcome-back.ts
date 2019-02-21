import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare const ENV;

/*
  Generated class for the WelcomeBack page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome-back',
  templateUrl: 'welcome-back.html'
})
export class WelcomeBackPage {

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private storage: Storage) {}

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.set('openId', this.navParams.data.openId);
      this.storage.set('avatar', this.navParams.data.avatar);
      this.storage.set('nickname', this.navParams.data.nickname);
      this.storage.set('roomId', this.navParams.data.roomId);
    });
  }

  gotoHome() {
    window.location.href = `${ENV.host}/index.html`;
  }

}
