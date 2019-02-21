/**
 * Created by yipingw on 11/12/2016.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'costTypeLiteral' })
export class CostTypePipe implements PipeTransform {
  transform(value: string): string {
    let lit = '';
    switch (parseInt(value)) {
      case -1:
        lit = '全部';
        break;
      case 0:
        lit = '物业费';
        break;
      case 1:
        lit = '地源热泵基本费';
        break;
      case 2:
        lit = '余额调差';
        break;
      case 3:
        lit = '商铺租金';
        break;
      case 4:
        lit = '空调费';
        break;
      case 5:
        lit = '热水费';
        break;
      case 6:
        lit = '停车费';
        break;
      default:
        lit = '物业费';
    }
    return lit;
  }
}
