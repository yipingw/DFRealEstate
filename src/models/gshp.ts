/**
 * Created by yipingw on 2016/12/6.
 */

export class Gshp {
  id: number;               // 房屋id
  room_number: string;      // 房间号
  bill_date: string;        // 账单区间
  cost_amount: number;      // 基本服务费
  hotwater: string;         // 热水费起止码
  hotwater_amount: number;  // 热水使用费
  aircon: string;           // 空调费起止码
  aircon_amount: number;    // 空调使用费
  balance: number;          // 账户余额
  money: number;            // 缴费金额
}
