import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { UserDataService } from '../providers/user-data.service';
import { SocialProvider } from '../models/social-provider';

import { TabsPage } from '../pages/tabs/tabs';

declare const ENV;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  @ViewChild(Nav) navChild: Nav;
  constructor(public platform: Platform, translate: TranslateService, private userDataService: UserDataService) {

    this.platformReady();
    translate.setDefaultLang('cn');
    translate.use('cn');
    this.getProvider();
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {

    });
  }

  // 获取当前是在微信还是支付宝中运行
  getProvider() {
    let ua = navigator.userAgent.toLowerCase();
    let wechatRegExp = /MicroMessenger/i;
    if (wechatRegExp.test(ua)) {
      this.userDataService.socialProvider = SocialProvider.Wechat;
      return;
    }

    let alipayRegExp = /AlipayClient/i;
    if (alipayRegExp.test(ua)) {
      this.userDataService.socialProvider = SocialProvider.Alipay;
      return;
    }

    this.userDataService.socialProvider = SocialProvider.Browser;
  }

}
