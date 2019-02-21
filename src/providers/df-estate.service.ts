/**
 * Created by yipingw on 2016/12/6.
 */

import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bill } from '../models/bill';
import { Estate } from '../models/estate';
import { Gshp } from '../models/gshp';
import { Parking } from '../models/parking';
import { Order } from '../models/order';
import {Zone} from '../models/zone';
import { Building } from '../models/building';
import { Unit } from '../models/unit';
import { Room } from '../models/room';
import { Owner } from '../models/owner';
import {Group} from "../models/group";

declare const ENV;
const HOSTNAME = `${ENV.dffdcAPIUrl}/`;
const DFFDC_ALIPAY_HOSTNAME = `${ENV.dffdcAlipayAPIUrl}/`;

@Injectable()
export class DfEstateService {
  private headers = new Headers();
  private showPropertyPayUri = 'showPropertyPay';
  private showUserRoomUri = 'showUserRoom';
  private changePropertyPayMonthUri = 'changePropertyPayMonth';
  private propertyPayMonthUri = 'propertyPayMonth';
  private showParkingPayUri = 'showParkingPay';
  private changeParkingPayMonthUri = 'changeParkingPayMonth';
  private parkingPayMonthUri = 'parkingPayMonth';
  private showGshpPayUri = 'showGSHPPay';
  private gshpMonthUri = 'gshpMonth';
  private showAddUserUri = 'showAddUser';
  private showGroupUri = 'showGroups';
  private showBuildingUri = 'showBuilding';
  private showUnitUri = 'showUnit';
  private showRoomUri = 'showRoom';
  private addUserUri = 'addUser';
  private showBillListUri = 'showBillList';
  private showBillUri = 'showBill';
  private sendCodeUri = 'sendCode';
  private getOwnerInfoUri = 'getOwnerInfo';
  private getBalanceUri = 'getBalance';
  private showOrderListUri = 'showOrderList';
  private orderDetailUri = 'orderDetail';
  private createOrderUri = 'wxPay/topay';
  private createAlipayOrderUri = 'gatewayServlet/topay';
  private chargingStandardUri = 'getFeeScale';
  private setDefaultRoomIdUri = 'setDefaultRoomId';

  constructor(private http: Http) {

  }

  private handleError(error: any): Promise<any> {
    console.error('发生错误:', error);
    return Promise.reject(error.message || JSON.stringify(error));
  }

  wechatAuth() {
    return `${ENV.wechatAPIUrl}/connect/oauth2/authorize?appid=${ENV.wechatAppId}&redirect_uri=${encodeURIComponent('')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  }

  alipayAuth() {
    return `${ENV.alipayAPIUrl}/` +
        'oauth2/publicAppAuthorize.htm?app_id=' +
        `${ENV.alipayAppId}` +
        '&scope=auth_user&redirect_uri=' +
        encodeURIComponent('')
  }

  /**
   * 显示物业费缴费页面
   * @param 房号ID
   * @returns {Promise<TResult|T>}
   */
  showPropertyPay(id: number, openid: string): Promise<Estate> {
    const uri = `${HOSTNAME}${this.showPropertyPayUri}?id=${id}&openid=${openid}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Estate;
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  showUserRoom(openid: string): Promise<Estate[]> {
    const uri = `${HOSTNAME}${this.showUserRoomUri}?openid=${openid}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Estate[];
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 更改“本次缴费几个月”
   * @param 房号ID
   * @param 本次缴费几个月
   * @returns {Promise<TResult|T>} end_month 本次缴费截至月份, money 缴费金额
   */
  changePropertyPayMonth(id: number, month: number, openid: string): Promise<any> {
    const uri = `${HOSTNAME}${this.changePropertyPayMonthUri}?id=${id}&month=${month}&openid=${openid}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data;
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 提交物业费缴费
   * @param 房号ID
   * @param 本次缴费几个月
   * @returns {Promise<TResult|T>} success, msg
   */
  propertyPayMonth(id: number, month: number): Promise<any> {
    const uri = `${HOSTNAME}${this.propertyPayMonthUri}`;
    return this.http
      .post(uri, JSON.stringify({id: id, month: month}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * 显示停车费缴费页面
   * @param 房号ID
   * @returns {Promise<TResult|T>}
   */
  showParkingPay(id: number): Promise<Parking> {
    const uri = `${HOSTNAME}${this.showParkingPayUri}`;
    return this.http
      .post(uri, JSON.stringify({id: id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * 停车费更改“本次缴费几个月”
   * @param id
   * @param month
   * @returns {Promise<TResult|T>}
   */
  changeParkingPayMonth(id: number, month: number): Promise<any> {
    const uri = `${HOSTNAME}${this.changeParkingPayMonthUri}`;
    return this.http
      .post(uri, JSON.stringify({id: id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * 提交停车费缴费
   * @param 车牌号ID
   * @param 本次缴费几个月
   * @returns {Promise<TResult|T>}
   */
  parkingPayMonth(id: number, month: number): Promise<any> {
    const uri = `${HOSTNAME}${this.parkingPayMonthUri}`;
    return this.http
      .post(uri, JSON.stringify({id: id, month: month}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * 显示地源热泵缴费页面
   * @param 房号ID
   * @returns {Promise<TResult|T>}
   */
  showGshpPay(roomId: number, openId: string): Promise<Gshp> {
    const uri = `${HOSTNAME}${this.showGshpPayUri}?id=${roomId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Gshp;
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 提交地源热泵缴费
   * @param 房号ID
   * @returns {Promise<TResult|T>}
   */
  gshpMonth(id: number): Promise<any> {
    const uri = `${HOSTNAME}${this.gshpMonthUri}`;
    return this.http
      .post(uri, JSON.stringify({id: id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * 获取小区列表
   * @returns {Promise<TResult|T>}
   */
  showZone(): Promise<Zone[]> {
    const uri = `${HOSTNAME}${this.showAddUserUri}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Zone[];
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 获取组团列表
   * @returns {Promise<TResult|T>}
   */
  showGroup(zoneId: number): Promise<Group[]> {
    const uri = `${HOSTNAME}${this.showGroupUri}?id=${zoneId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Group[];
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 更改组团显示楼栋
   * @param 楼栋id
   * @returns {Promise<TResult|T>}
   */
  showBuilding(groupId: number): Promise<Building[]> {
    const uri = `${HOSTNAME}${this.showBuildingUri}?id=${groupId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Building[];
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 更改楼栋显示单元
   * @param 楼栋id
   * @returns {Promise<TResult|T>}
   */
  showUnit(buildingId: number): Promise<Unit[]> {
    const uri = `${HOSTNAME}${this.showUnitUri}?id=${buildingId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Unit[];
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 更改单元显示房号
   * @param  单元id
   * @returns {Promise<TResult|T>}
   */
  showRoom(unitId: number, openId: string): Promise<Room[]> {
    const uri = `${HOSTNAME}${this.showRoomUri}?id=${unitId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Room[];
        } else {
          return result.msg;
        }
      })
      .catch(this.handleError);
  }

  /**
   * 用户注册提交
   * @param 用户对象
   * @param 验证码
   * @returns {Promise<TResult|T>}
   */
  addUser(roomId: number, phoneNum: string, vcode: string, openid: string, socialPlatform: number): Promise<any> {
    const uri = `${HOSTNAME}${this.addUserUri}?id=${roomId}&phone=${phoneNum}&code=${vcode}&openid=${openid}&socialPlatform=${socialPlatform}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * 发送验证码到指定的手机号
   * @param phoneNum
   * @returns {Promise<TResult|T>}
   */
  sendCode(roomId: number, phoneNum: string): Promise<any> {
    const uri = `${HOSTNAME}${this.sendCodeUri}?id=${roomId}&phone=${phoneNum}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * 获取户主信息
   * @param roomId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  getOwnerInfo(roomId: number, openId: string): Promise<Owner> {
    const uri = `${HOSTNAME}${this.getOwnerInfoUri}?id=${roomId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data;
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 显示账单列表
   * @param roomId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  showBillList(roomId: number, openId: string, costTypeId?: string): Promise<Bill[]> {
    const uri = `${HOSTNAME}${this.showBillListUri}?id=${roomId}&openid=${openId}${costTypeId ? '&costType='+costTypeId : ''}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Bill[];
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 显示账单详情
   * @param billId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  showBill(billId: number, openId: string): Promise<Bill> {
    const uri = `${HOSTNAME}${this.showBillUri}?id=${billId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Bill;
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 显示订单记录列表
   * @param roomId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  showOrderList(roomId: number, openId: string): Promise<Order[]> {
    const uri = `${HOSTNAME}${this.showOrderListUri}?id=${roomId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Order[];
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 获取订单详情
   * @param orderId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  orderDetail(orderId: number, openId: string): Promise<Order> {
    const uri = `${HOSTNAME}${this.orderDetailUri}?id=${orderId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Order;
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 获取账户余额
   * @param roomId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  getBalance(roomId: number, openId: string): Promise<any> {
    const uri = `${HOSTNAME}${this.getBalanceUri}?id=${roomId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data;
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 创建微信订单
   * @param roomId
   * @param month
   * @param money
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  createOrder(roomId: number, month: string, money: number, openId: string, cost_type:number): Promise<Order> {
    const uri = `${HOSTNAME}${this.createOrderUri}?id=${roomId}&month=${month}&money=${money}&openid=${openId}&cost_type=${cost_type}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data as Order;
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 创建支付宝订单
   * @param roomId
   * @param month
   * @param money
   * @param openId
   * @param cost_type
   * @returns {string}
   */
  createAlipayOrder(roomId: number, month: string, money: number, openId: string, cost_type: number): string {
    let orderUri = `${DFFDC_ALIPAY_HOSTNAME}${this.createAlipayOrderUri}?id=${roomId}&month=${month}&money=${money}&openid=${openId}&cost_type=${cost_type}`;
    return orderUri;
  }

  /**
   * 获取用户默认房间号关联的各项收费标准（物业费、停车费、地源热泵等）
   * @param roomId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  chargingStandard(roomId: number, openId: string): Promise<any> {
    const uri = `${HOSTNAME}${this.chargingStandardUri}?id=${roomId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.success) {
          return result.data;
        } else {
          return result.msg;
        }
      }).catch(this.handleError);
  }

  /**
   * 设置默认的房间号
   * @param roomId
   * @param openId
   * @returns {Promise<TResult|T>}
   */
  setDefaultRoomId(roomId: number, openId: string): Promise<any> {
    const uri = `${HOSTNAME}${this.setDefaultRoomIdUri}?id=${roomId}&openid=${openId}`;
    return this.http
      .post(uri, JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(res => {
        let result = res.json();
        return result;
      }).catch(this.handleError);
  }

}
