import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {DfEstateService} from "../../../providers/df-estate.service";
import { SocialProvider } from '../../../models/social-provider';
import { UserDataService } from '../../../providers/user-data.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  socialProvider: String = 
    this.userDataService.socialProvider == SocialProvider.Wechat ||
    this.userDataService.socialProvider == SocialProvider.Browser ?
    '微信' : '支付宝';

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private dfEstateService: DfEstateService,
              private userDataService: UserDataService) {}

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  authClick() {
    if (this.userDataService.socialProvider == SocialProvider.Wechat
     || this.userDataService.socialProvider == SocialProvider.Browser) {
      window.location.href = this.dfEstateService.wechatAuth();
    }

    if (this.userDataService.socialProvider == SocialProvider.Alipay) {
      window.location.href = this.dfEstateService.alipayAuth();
    }
  }

}
