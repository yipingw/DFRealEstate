import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DfEstateService } from "../providers/df-estate.service";
import { UserDataService } from '../providers/user-data.service';
import { AlertService } from '../providers/alert.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'room-selector',
  template: `
    <ion-item>
      <ion-label>房号</ion-label>
        <ion-select style="max-width: 100% !important;" interface="action-sheet" okText="确定" cancelText="取消" [(ngModel)]="roomId" (ionChange)="roomChange(roomId)" >
          <ion-option *ngFor="let room of rooms" value="{{room.id}}" selected="{{room.id === roomId}}">{{room.room_number}}</ion-option>
        </ion-select>
    </ion-item>
  `
})
export class RoomSelectorComponent {
  @Input() roomId: number;
  rooms: Estate[];
  @Output() onRoomChange: EventEmitter<any> = new EventEmitter();
  constructor(
    private userDataService: UserDataService,
    private dfEstateService: DfEstateService,
    private alertService: AlertService) {
    this.userDataService.load(() => {
      if (this.userDataService.openId) {
        this.dfEstateService.showUserRoom(this.userDataService.openId)
          .then((result) => {
            if (typeof result === 'object') {
              this.userDataService.roomId = this.userDataService.roomId || result[0].id;
              this.roomId = this.userDataService.roomId;
              this.rooms = result;
            } else {
              this.alertService.presentAlert('错误', result);
            }
          })
      } else {
        console.warn('openid is null or user not log in.');
      }
    });
  }

  roomChange(roomId: number): void {
    this.userDataService.roomId = roomId;
    this.onRoomChange.emit([roomId]);
  }
}
