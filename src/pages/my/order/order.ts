import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Order } from "../../../models/order";
import { Estate } from "../../../models/estate";
import { AlertService } from "../../../providers/alert.service";
import { DfEstateService } from "../../../providers/df-estate.service";
import { OrderDetailPage } from "../order-detail/order-detail";
import { UserDataService } from "../../../providers/user-data.service";

/*
  Generated class for the Order page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage implements OnInit {
  orders: Order[];
  openId: string;
  roomId: number;
  rooms: Estate[];

  constructor(
    public navCtrl: NavController,
    private alertService: AlertService,
    private dfEstateService: DfEstateService,
    private userDataService: UserDataService) { }

  ionViewDidLoad() {

  }

  ngOnInit() {

    this.openId = this.userDataService.openId;
    if (!this.openId) return;

    this.roomId = this.userDataService.roomId;
    this.showOrderList(this.roomId, this.userDataService.openId);
  }

  showOrderList(roomId: number, openId: string) {
    this.dfEstateService.showOrderList(roomId, openId)
      .then(result => {
        if (typeof result === 'object') {
          this.orders = result;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      })
  }

  roomChange(roomId: number) {
    this.showOrderList(roomId, this.userDataService.openId);
  }

  gotoDetail(orderId: number) {
    this.navCtrl.push(OrderDetailPage, { orderId: orderId });
  }

}
