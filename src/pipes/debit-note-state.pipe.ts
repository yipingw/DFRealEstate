/**
 * Created by yipingw on 11/12/2016.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'debitNoteState'})
export class DebitNoteStatePipe implements PipeTransform {
  transform(value: string) {
    let lit = '';

    switch (parseInt(value)) {
      case 0:
        lit = '欠缴';
        break;
      case 1:
        lit = '已缴';
        break;
      case 2:
        lit = '已预缴';
        break;
      case 3:
        lit = '减免待审批';
        break;
      case 4:
        lit = '减免';
        break;
      case 5:
        lit = '已退';
        break;
      default:
        lit = '欠缴';
        break;
    }

    return lit;
  }
}
