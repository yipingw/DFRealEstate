import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertService {

  constructor(private alertCtrl: AlertController) {

  }

  presentAlert(title: string, subTitle: any, handler?: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons:[{
        text: '确定',
        handler: handler
      }]
    });

    alert.present();
  }

  presentConfirm(title: string, msg: string, confirmHandler?: any, cancelHandler?: any) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: cancelHandler
        },
        {
          text: '确定',
          handler: confirmHandler
        }
      ]
    });

    alert.present();
  }

}
