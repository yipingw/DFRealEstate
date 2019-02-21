import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Location } from '@angular/common';
import { Bill } from "../../../models/bill";
import { AlertService } from "../../../providers/alert.service";
import { DfEstateService } from "../../../providers/df-estate.service";
import { BillDetailPage } from "../bill-detail/bill-detail";
import { UserDataService } from '../../../providers/user-data.service';
import { Estate } from "../../../models/estate";
import { EstatePage } from "../../../pages/estate/estate";

declare const ENV;

/*
  Generated class for the Bill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html'
})
export class BillPage implements OnInit {
  item;
  bills: Bill[];
  rooms: Estate[];
  roomId: number;
  costTypes: number[] = [-1, 0];
  costTypeId: number = -1;

  constructor(
    public navCtrl: NavController,
    private params: NavParams,
    private location: Location,
    private alertService: AlertService,
    private dfEstateService: DfEstateService,
    private userDataService: UserDataService,
    private events: Events) {
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.userDataService.load(() => {
      if (!this.userDataService.openId) {
        window.location.href = ENV.isProd ? 'http://ms.dffdc.cn/wx/index.html#/auth' : 'http://localhost:8100/index.html#/welcome-back/oOWg5wjjKjKeYfGG7Ggjr-HK5o6Q/http%3A%2F%2Fpic.nipic.com%2F2007-07-27%2F200772784417204_2.jpg/Fenix Wang/2';
        return;
      } else {
        this.retrieveBillList(this.userDataService.roomId, this.userDataService.openId);
      }
    });
  }

  retrieveBillList(roomId: number, openId: string, costTypeId?: string) {
    if (parseInt(costTypeId) === -1) {
      costTypeId = undefined;
    }

    this.dfEstateService.showBillList(roomId, openId, costTypeId)
      .then(result => {
        if (typeof result === 'object') {
          this.bills = result;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  roomChange(roomId: number) {
    if (!roomId) return;
    this.costTypeId = -1;
    this.retrieveBillList(roomId, this.userDataService.openId);
  }

  costTypeChange(costTypeId: string) {
    this.retrieveBillList(this.userDataService.roomId, this.userDataService.openId, costTypeId);
  }

  gotoDetail(billId: number) {
    if (!billId) return;
    this.navCtrl.push(BillDetailPage, {openId: this.userDataService.openId, billId: billId, roomId: this.userDataService.roomId });
  }

  gotoEstate() {
    this.navCtrl.push(EstatePage, {});
  }

}
