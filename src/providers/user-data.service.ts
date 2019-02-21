import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

import { SocialProvider } from '../models/social-provider';

@Injectable()
export class UserDataService {

  private _openId: string;
  private _avatar: string;
  private _nickname: string;
  private _roomId: number;
  private _socialProvider: SocialProvider;

  public get openId(): string {
    return this._openId;
  }

  public set openId(value: string) {
    this.storage.set('openId', value);
    this._openId = value;
  }

  public get avatar(): string {
    return this._avatar;
  }

  public set avatar(value: string) {
    this.storage.set('avatar', value);
    this._avatar = value;
  }

  public get nickname(): string {
    return this._nickname;
  }

  public set nickname(value: string) {
    this.storage.set('nickname', value);
    this._nickname = value;
  }

  public get roomId(): number {
    return this._roomId;
  }

  public set roomId(value: number) {
    this.storage.set('roomId', value);
    this._roomId = value;
  }

  public get socialProvider(): SocialProvider {
    return this._socialProvider;
  }

  public set socialProvider(value: SocialProvider) {
    this._socialProvider = value;
  }

  constructor(
    private storage: Storage
  ) {
    console.log('user data initialized.');
  }

  load(cb) {
    let promises = [];
    promises.push(this.storage.get('openId'));
    promises.push(this.storage.get('avatar'));
    promises.push(this.storage.get('nickname'));
    promises.push(this.storage.get('roomId'));

    return Observable.forkJoin(promises).subscribe(t => {
      if (!!(t && t[0] && t[1] && t[2] && t[3])) {
        this._openId = t[0].toString();
        this._avatar = t[1].toString();
        this._nickname = t[2].toString();
        this._roomId = parseInt(t[3].toString());
      } else {
        console.error('missing parameters!');
      }

      cb();
    });
  }



  clear() {
    this.storage.remove('openId');
    this.storage.remove('avatar');
    this.storage.remove('nickname');
    this.storage.remove('roomId');
    this._openId = undefined;
    this._avatar = undefined;
    this._nickname = undefined;
    this._roomId = undefined;
  }
}
