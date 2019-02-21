import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Zone } from '../../../models/zone';
import { Building } from '../../../models/building';
import { Unit } from '../../../models/unit';
import { Room } from '../../../models/room';
import { DfEstateService } from "../../../providers/df-estate.service";
import { AlertService } from "../../../providers/alert.service";
import { ToastService } from "../../../providers/toast.service";
import { Group } from "../../../models/group";
import { UserDataService } from "../../../providers/user-data.service";

declare const ENV;
const DEFAULT_VCODE_TEXT = '发送验证码';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  zones: Zone[];
  groups: Group[];
  buildings: Building[];
  units: Unit[];
  rooms: Room[];
  selectedZoneId: number = -1;
  selectedGroupId: number = -1;
  selectedBuildingId: number = -1;
  selectedUnitId: number = -1;
  selectedRoomId: number = -1;
  mobile: string;
  vcode: string;
  openId: string;
  nickname: string;
  vcodeText: string = DEFAULT_VCODE_TEXT;
  needDisable: boolean = false;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private dfEstateService: DfEstateService,
    private alertService: AlertService,
    private toastService: ToastService,
    private userDataService: UserDataService) { }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.userDataService.load(() => {
      this.openId = this.userDataService.openId || this.navParams.data.openId;
      if (!this.openId) {
        window.location.href = ENV.isProd ? 'http://ms.dffdc.cn/wx/index.html#/auth' : 'http://localhost:8100/index.html#/welcome-back/oOWg5wjjKjKeYfGG7Ggjr-HK5o6Q/http%3A%2F%2Fpic.nipic.com%2F2007-07-27%2F200772784417204_2.jpg/Fenix Wang/2';
        return;
      }

      this.dfEstateService.showZone()
        .then(result => {
          if (typeof result === 'object') {
            this.zones = result;
          } else {
            this.alertService.presentAlert('错误', result);
          }
        })
    });
  }

  zoneChange(zoneId: number) {
    this.dfEstateService.showGroup(zoneId)
      .then(result => {
        if (typeof result === 'object') {
          this.groups = result;
          this.buildings = [];
          this.units = [];
          this.rooms = [];
          this.selectedGroupId = -1;
          this.selectedBuildingId = -1;
          this.selectedUnitId = -1;
          this.selectedRoomId = -1;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  groupChange(groupId: number) {
    this.dfEstateService.showBuilding(groupId)
      .then(result => {
        if (typeof result === 'object') {
          this.buildings = result;
          this.units = [];
          this.rooms = [];
          this.selectedBuildingId = -1;
          this.selectedUnitId = -1;
          this.selectedRoomId = -1;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  buildingChange(buildingId: number) {
    this.dfEstateService.showUnit(buildingId)
      .then(result => {
        if (typeof result === 'object') {
          this.units = result;
          this.rooms = [];
          this.selectedUnitId = -1;
          this.selectedRoomId = -1;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  unitChange(unitId: number) {
    this.dfEstateService.showRoom(unitId, this.openId)
      .then(result => {
        if (typeof result === 'object') {
          this.rooms = result;
          this.selectedRoomId = -1;
        } else {
          this.alertService.presentAlert('错误', result);
        }
      });
  }

  disableVcode() {
    return !(this.mobile && this.mobile.length === 11 && !this.needDisable);
  }

  countDown() {
    this.needDisable = true;
    let count = 60;
    let interval = setInterval(() => {
      count--;
      this.vcodeText = count.toString() + '秒后重发';
      if (count < 0) {
        clearInterval(interval);
        this.vcodeText = DEFAULT_VCODE_TEXT;
        this.needDisable = false;
      }
    }, 1000);
  }

  sendSMS(phoneNum: string) {
    if (this.selectedRoomId === -1) {
      this.alertService.presentAlert('错误', '请选择房号');
      return;
    }

    this.dfEstateService.sendCode(this.selectedRoomId, phoneNum)
      .then(result => {
        if (result.success) {
          this.countDown();
        }
        this.alertService.presentAlert(result.success ? '成功' : '温馨提示', result.msg);
      })
  }

  validate(): boolean {
    if (!this.selectedRoomId) {
      this.toastService.presentToast("请选择房号");
      return false;
    }

    if (!this.mobile) {
      this.toastService.presentToast("请填写手机号");
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
      this.toastService.presentToast('请填写正确的手机号');
      return false;
    }

    if (!this.vcode) {
      this.toastService.presentToast('请填写验证码');
      return false;
    }

    return true;
  }

  register(roomId: number) {

    if (this.validate()) {
      this.dfEstateService.addUser(
        roomId, 
        this.mobile, 
        this.vcode, 
        this.openId,
        this.userDataService.socialProvider
        )
        .then(result => {
          if (result.success) {
            // 如果是走的注册流程
            if (this.navParams.data && Object.keys(this.navParams.data).length === 3) {
              this.userDataService.openId = this.navParams.data.openId;
              this.userDataService.avatar = this.navParams.data.avatar;
              this.userDataService.nickname = this.navParams.data.nickname;
            }

            // 此处会把刚添加的房间作为默认房间对待
            this.userDataService.roomId = roomId;

            this.alertService.presentAlert('成功', result.msg, () => {
              window.location.href = 'http://ms.dffdc.cn/wx/index.html';
            });
          } else {
            this.alertService.presentAlert('温馨提示', result.msg);
          }
        })
    }

  }
}
