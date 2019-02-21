import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AlertService} from "../../providers/alert.service";

declare var WeixinJSBridge;

/*
 Generated class for the FreshOrder page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-fresh-order',
  templateUrl: 'fresh-order.html'
})
export class FreshOrderPage implements OnInit {
  freshOrder: any;

  constructor(public navCtrl: NavController,
              private alertService: AlertService,
              private navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.freshOrder = this.navParams.data.freshOrder;
  }


  pay() {
    let payObject = {
      appId: this.navParams.data.freshOrder.appid,
      timeStamp: this.navParams.data.freshOrder.timestamp,
      nonceStr: this.navParams.data.freshOrder.noncestr,
      package: 'prepay_id=' + this.navParams.data.freshOrder.prepayid,
      signType: this.navParams.data.freshOrder.signtype,
      paySign: this.navParams.data.freshOrder.paysign
    };

    console.debug(JSON.stringify(payObject));

    function onBridgeReady(payObj) {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', payObj,
        function (res) {
          if (res.err_msg == "get_brand_wcpay_request：ok") {
          }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        }
      );
    }

    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      }
    } else {
      onBridgeReady(payObject);
    }
  }
}
