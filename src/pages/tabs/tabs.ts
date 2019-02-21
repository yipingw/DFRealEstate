import { Component, ViewChild } from '@angular/core';
import {Tabs} from 'ionic-angular';
import { EstatePage } from '../estate/estate';
import { ParkingPage } from '../parking/parking';
import { GshpPage } from '../gshp/gshp';
import { MyPage } from '../my/my';

declare const ENV;

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabEstateRoot: any = EstatePage;
  tabParkingRoot: any = ParkingPage;
  tabGshpRoot: any = GshpPage;
  tabMyRoot: any = MyPage;

  constructor() {
    
  }

  ionViewDidEnter() {
    this.tabRef.select(2);
  }
}
