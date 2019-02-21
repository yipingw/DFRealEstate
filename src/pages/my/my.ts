import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProfilePage } from './profile/profile';
import { BillPage } from './bill/bill';
import { OrderPage } from './order/order';
import { ManualPage } from './manual/manual';
import { AboutPage } from './about/about';
import { AuthPage } from './auth/auth';
import { BillDetailPage } from './bill-detail/bill-detail';
import { UserDataService } from "../../providers/user-data.service";
import { AlertService } from "../../providers/alert.service";
import { DfEstateService } from "../../providers/df-estate.service";
import {Estate} from '../../models/estate';

const DEFAULT_AVATAR = './assets/images/person.png';
const DEFAULT_NICKNAME = '登录';

/*
  Generated class for the My page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})



export class MyPage implements OnInit {
  openId: string;
  avatar: string = this.userDataService.avatar || DEFAULT_AVATAR;
  nickname: string = this.userDataService.nickname || DEFAULT_NICKNAME;
  items = [];
  roomId: number;
  rooms: Estate[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertService: AlertService,
    private userDataService: UserDataService,
    private dfEstateService: DfEstateService) {

    this.items = [
      { 'title': '户主信息' },
      { 'title': '我的账单' },
      { 'title': '缴费记录' },
      { 'title': '功能手册' },
      { 'title': '关于' }
    ];
  }

  ngOnInit() {
    this.userDataService.load(() => {
      if (this.userDataService.openId) {
        this.avatar = this.userDataService.avatar;
        this.nickname = this.userDataService.nickname;

        if (window.location.search != '') {
          let qs = window.location.search.substring(1).split('&');
          let params = {};
          for (let i = 0; i < qs.length; i++) {
            params[qs[i].split('=')[0]] = qs[i].split('=')[1];
          }

          switch (params['page']) {
            case 'BillDetailPage':
              this.navCtrl.push(BillDetailPage, {openId: params['openid'], billId: params['billid']});
            break;
          }
        
        }
      }
    });
  }

  ionViewDidEnter() {
    this.roomId = this.userDataService.roomId;
  }

  ionViewDidLoad() {

  }

  roomChange(roomId: number) {

  }

  openLoginPage() {
    let modal = this.modalCtrl.create(AuthPage);
    modal.present();
  }

  logout() {
    this.alertService.presentConfirm('提示', '您确定要登出吗？', () => {
      this.userDataService.clear();
      this.avatar = DEFAULT_AVATAR;
      this.nickname = DEFAULT_NICKNAME;
      this.openId = undefined;
    });
  }

  openNavDetailsPage(item) {
    let itemIndex = this.items.indexOf(item);

    switch (itemIndex) {
      case 0:
        if (this.userDataService.openId) {
          this.navCtrl.push(ProfilePage, { item: item });
        } else {
          this.openLoginPage();
        }
        break;
      case 1:
        if (this.userDataService.openId) {
          this.navCtrl.push(BillPage, { item: item });
        } else {
          this.openLoginPage();
        }
        break;
      case 2:
        if (this.userDataService.openId) {
          this.navCtrl.push(OrderPage, { item: item });
        } else {
          this.openLoginPage();
        }
        break;
      case 3:
        this.navCtrl.push(ManualPage, { item: item });
        break;
      case 4:
        this.navCtrl.push(AboutPage, { item: item });
        break;
      default:
        console.error('Should not come here. Index does not exist!');
        throw new Error('Should not come here. Index does not exist!');
    }
  }

}
