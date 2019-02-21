import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {DfEstateService} from "../../../providers/df-estate.service";
import {AlertService} from "../../../providers/alert.service";
import {UserDataService} from "../../../providers/user-data.service";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  item;
  fields;

  constructor(params: NavParams, private alertCtrl: AlertService, private dfEstateService: DfEstateService, private userDataService: UserDataService) {
    this.item = params.data.item;
    this.fields = [
      {key: '姓名', value: ''},
      {key: '身份证号', value: ''},
      {key: '电话', value: ''},
      {key: '账户余额', value: ''},

    ];
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.dfEstateService.getOwnerInfo(this.userDataService.roomId, this.userDataService.openId)
      .then(result => {
        if (typeof result === 'object') {
          this.fields[0].value = result.owner_name;
          this.fields[1].value = result.owner_card;
          this.fields[2].value = result.owner_phone;
          this.fields[3].value = result.balance;
        } else {
          this.alertCtrl.presentAlert('错误', result);
        }
      })
  }

}
