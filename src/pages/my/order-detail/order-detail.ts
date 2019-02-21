import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertService} from "../../../providers/alert.service";
import {DfEstateService} from "../../../providers/df-estate.service";
import {Order} from "../../../models/order";
import {UserDataService} from '../../../providers/user-data.service';

/*
  Generated class for the OrderDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage implements OnInit {
  order: Order;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private alertService: AlertService,
    private dfEstateService: DfEstateService,
    private userDataService: UserDataService ) {}

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.dfEstateService.orderDetail(this.navParams.data.orderId, this.userDataService.openId)
      .then(result => {
        if (typeof result === 'object') {
          this.order = result;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      })
  }

}
