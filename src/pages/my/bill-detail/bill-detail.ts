import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AlertService } from "../../../providers/alert.service";
import { DfEstateService } from "../../../providers/df-estate.service";
import { Bill } from "../../../models/bill";
import { UserDataService } from "../../../providers/user-data.service";
import { EstatePage } from "../../../pages/estate/estate";

/*
  Generated class for the BillDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html'
})
export class BillDetailPage implements OnInit {
  bill: Bill;

  constructor(
    public navCtrl: NavController,
    private alertService: AlertService,
    private dfEstateService: DfEstateService,
    private navParams: NavParams,
    private userDataService: UserDataService,
    private events: Events) { }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.userDataService.load(() => {
      let openId = this.userDataService.openId || this.navParams.data.openId;
      this.dfEstateService.showBill(this.navParams.data.billId, openId)
        .then(result => {
          if (typeof result === 'object') {
            this.bill = result;
          } else {
            this.alertService.presentAlert('错误', result);
          }
        })
    });
  }

  gotoEstate() {
    console.log(this.bill.id);
    this.navCtrl.push(EstatePage, { roomId: this.bill.id });
  }

}
