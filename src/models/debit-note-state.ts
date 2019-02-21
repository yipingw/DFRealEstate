/**
 * Created by yipingw on 2016/12/9.
 */

/**
 * 缴费单状态
 */
export enum DebitNoteState {
  Arrears = 0,      // 欠缴
  PaidIn = 1,       // 已缴
  Prepay = 2,       // 已预缴
  Promoting = 3,    // 减免待审批
  Promoted = 4,     // 减免
  Refunded = 5      // 已退
}
