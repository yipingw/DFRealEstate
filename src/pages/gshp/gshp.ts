import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserDataService } from "../../providers/user-data.service";
import { DfEstateService } from "../../providers/df-estate.service";
import { AlertService } from "../../providers/alert.service";
import { Gshp } from "../../models/gshp";
import { CostType } from "../../models/cost-type";
import { FreshOrderPage } from "../fresh-order/fresh-order";
import { SocialProvider } from "../../models/social-provider";

@Component({
  selector: 'page-gshp',
  templateUrl: 'gshp.html'
})
export class GshpPage implements OnInit {
  roomId: number;
  openId: string;
  selectedGshp: Gshp;
  socialProvider: SocialProvider;

  constructor(public navCtrl: NavController,
    private userDataService: UserDataService,
    private dfEstateService: DfEstateService,
    private alertService: AlertService) {

  }

  ionViewDidEnter() {
    // 如果注销之后再返回该页面应该隐藏登录后的界面并显示请登录
    if (!this.userDataService.openId) {
      this.openId = undefined;
      this.selectedGshp = undefined;
    } else {
      this.roomId = this.userDataService.roomId;
      this.showGshpPay(this.roomId, this.userDataService.openId);
    }
  }

  ngOnInit() {
    this.userDataService.load(() => {
      this.openId = this.userDataService.openId;
      this.socialProvider = this.userDataService.socialProvider;
      if (!this.openId) return;

      this.showGshpPay(this.userDataService.roomId, this.userDataService.openId);
    });
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

  showGshpPay(roomId: number, openId: string) {
    this.dfEstateService.showGshpPay(roomId, openId).then(result => {
      if (typeof result === 'object') {
        this.selectedGshp = result;
        this.selectedGshp.id = roomId;
        this.userDataService.roomId = roomId;
      } else {
        this.alertService.presentAlert('错误', result);
      }
    });
  }

  roomChange(roomId: number) {
    if (!roomId) return;
    this.showGshpPay(roomId, this.userDataService.openId);
  }

  createOrder() {
    if (this.userDataService.socialProvider == SocialProvider.Wechat ||
      this.userDataService.socialProvider == SocialProvider.Browser) {
      this.dfEstateService.createOrder(
        this.selectedGshp.id,
        this.selectedGshp.bill_date,
        this.selectedGshp.money,
        this.userDataService.openId,
        CostType.Gshpfee)
        .then(result => {
          if (typeof result === 'object') {
            this.navCtrl.push(FreshOrderPage, { freshOrder: result });
          } else {
            this.alertService.presentAlert('错误', result);
          }
        });
    }

    if (this.userDataService.socialProvider == SocialProvider.Alipay) {
      let payUri = this.dfEstateService.createAlipayOrder(
        this.selectedGshp.id,
        this.selectedGshp.bill_date,
        this.selectedGshp.money,
        this.userDataService.openId,
        CostType.Gshpfee
      );

      window.location.href = payUri;
    }

  }

}
