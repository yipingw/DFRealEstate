import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { DfEstateService } from "../../providers/df-estate.service";
import { AlertService } from "../../providers/alert.service";
import { UserDataService } from '../../providers/user-data.service';

import { Estate } from "../../models/estate";

declare const ENV;

/*
  Generated class for the ChargingStandard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-charging-standard',
  templateUrl: 'charging-standard.html'
})
export class ChargingStandardPage implements OnInit {
  rooms: Estate[];
  room_number: string;
  area: number;
  tolls: Array<any>;

  constructor(public navCtrl: NavController,
    private dfEstateService: DfEstateService,
    private alertService: AlertService,
    private userDataService: UserDataService,
    private events: Events) { }

  ngOnInit() {

    this.userDataService.load(() => {
      // 如果是从微信菜单进入的则需要从localstorage里面获取openId，如果没有则跳转到授权界面
      if (!this.userDataService.openId) {
        window.location.href = ENV.isProd ? 'http://ms.dffdc.cn/wx/index.html#/auth' : 'http://localhost:8100/index.html#/welcome-back/oOWg5wjjKjKeYfGG7Ggjr-HK5o6Q/http%3A%2F%2Fpic.nipic.com%2F2007-07-27%2F200772784417204_2.jpg/Fenix Wang/2';
        return;
      } else {
        this.retrieveChargingStandard(this.userDataService.roomId);
      }
    });
  }

  ionViewDidLoad() {

  }

  retrieveChargingStandard(roomId: number) {
    this.dfEstateService.chargingStandard(roomId, this.userDataService.openId)
      .then(result => {
        if (typeof result === 'object') {
          this.room_number = result.room_number;
          this.area = result.area;
          this.tolls = result.list;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  roomChange(roomId: number) {
    this.retrieveChargingStandard(roomId);
  }

}
