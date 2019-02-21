import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Estate } from '../../models/estate';
import { DfEstateService } from '../../providers/df-estate.service';
import { AlertService } from "../../providers/alert.service";
import { FreshOrderPage } from "../fresh-order/fresh-order";
import { UserDataService } from "../../providers/user-data.service";
import { CostType } from "../../models/cost-type";
import { SocialProvider } from "../../models/social-provider";

@Component({
  selector: 'page-estate',
  templateUrl: 'estate.html',
  providers: [DfEstateService]
})
export class EstatePage implements OnInit {
  roomId: number;
  openId: string;
  selectedRoom: Estate;
  socialProvider: SocialProvider;

  constructor(
    public navCtrl: NavController,
    private alertService: AlertService,
    private dfEstateService: DfEstateService,
    private navParams: NavParams,
    private userDataService: UserDataService) {

  }

  ionViewDidEnter() {
    // 如果注销之后再返回该页面应该隐藏登录后的界面并显示请登录
    if (!this.userDataService.openId) {
      this.openId = undefined;
      this.selectedRoom = undefined;
    } else {
      this.roomId = this.userDataService.roomId;
      this.showPropertyPay(this.roomId, this.userDataService.openId);
    }
  }

  ngOnInit() {
    this.userDataService.load(() => {
      this.socialProvider = this.userDataService.socialProvider;
      this.openId = this.userDataService.openId;
      if (!this.openId) return;

      let roomId = this.navParams.data.roomId || this.userDataService.roomId;
      this.showPropertyPay(roomId, this.userDataService.openId);
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

  showPropertyPay(id: number, openid: string) {
    this.dfEstateService.showPropertyPay(id, openid).then(result => {
      if (typeof result === 'object') {
        this.selectedRoom = result;
        this.selectedRoom.id = id;
        this.userDataService.roomId = id;
      } else {
        this.alertService.presentAlert('错误', result);
      }
    });
  }

  roomChange(roomId: number) {
    if (!roomId) return;
    this.showPropertyPay(roomId, this.userDataService.openId);
  }

  billDateNumChange(billDateNum: number) {
    if (!billDateNum) return;

    if (billDateNum <= 0) {
      this.alertService.presentAlert('错误', '月数必须大于零！');
      return;
    }

    this.dfEstateService.changePropertyPayMonth(this.selectedRoom.id, billDateNum, this.userDataService.openId)
      .then(result => {
        if (typeof result === 'object') {
          this.selectedRoom.bill_date = result.end_month;
          this.selectedRoom.money = result.money;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  createOrder() {
    if (this.userDataService.socialProvider == SocialProvider.Wechat ||
      this.userDataService.socialProvider == SocialProvider.Browser) {
      this.dfEstateService.createOrder(
        this.selectedRoom.id,
        String(this.selectedRoom.bill_date_num),
        this.selectedRoom.money,
        this.userDataService.openId,
        CostType.PropertyFee)
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
        this.selectedRoom.id,
        String(this.selectedRoom.bill_date_num),
        this.selectedRoom.money,
        this.userDataService.openId,
        CostType.PropertyFee
      );

      window.location.href = payUri;
    }
  }


}
