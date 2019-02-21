/**
 * Created by yipingw on 09/12/2016.
 */

/**
 * 订单
 */
export class Order {
  id: number;               // 订单id
  order_number: string;     // 订单编号
  last_person: string;      // 最后修改人
  name: string;             // 订单名称
  create_time: Date;        // 创建时间
  create_person: string;    // 创建人
  money: string;            // 缴费金额
  month: string;            // 缴费月数
  pk_id: string;            // 房间号
  last_time: Date;          // 修改时间
  cost_type: string;        // 费用类型
  remark: string            // 备注
}
