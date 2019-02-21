/**
 * Created by yipingw on 2016/12/6.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let estate = {
      id: 1,                                // 房号ID
      room_number: "赤峰苑1栋1单元1813室",   // 房间号
      cost_amount: 133,                     // 当前欠费金额
      balance: 0.13,                        // 账户余额
      last_bill_date: '2016年8月',          // 上次缴费截止月份
      bill_date: '2016年12月',              // 本次缴费截止月份
      bill_date_num: 1,                     // 本次缴费几个月（默认初始1个月）
      money: 120                            // 缴费金额
    };

    return {estate};
  }
}
