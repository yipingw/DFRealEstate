import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertService} from "../../../providers/alert.service";
import {DfEstateService} from "../../../providers/df-estate.service";
import {UserDataService} from "../../../providers/user-data.service";

/*
  Generated class for the AccountBalance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-balance',
  templateUrl: 'account-balance.html'
})
export class AccountBalancePage implements OnInit {
  item;
  balance: string;

  constructor(
    public navCtrl: NavController,
    private params: NavParams,
    private alertService: AlertService,
    private dfEstateService: DfEstateService, 
    private userDataService: UserDataService) {
    this.item = params.data.item;
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.dfEstateService.getBalance(this.userDataService.roomId, this.userDataService.openId)
      .then(result => {
        if (typeof result === 'object') {
          this.balance = result.balance;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      })
  }

}
