import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {Http, HttpModule, JsonpModule} from "@angular/http";
import { IonicStorageModule  } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';

/* 业务组件 */
import { MyApp } from './app.component';
import { ParkingPage } from '../pages/parking/parking';
import { GshpPage } from '../pages/gshp/gshp';
import { EstatePage } from '../pages/estate/estate';
import { MyPage } from '../pages/my/my';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/my/profile/profile';
import { AccountBalancePage } from '../pages/my/account-balance/account-balance';
import { BillPage } from '../pages/my/bill/bill';
import { OrderPage } from '../pages/my/order/order';
import { OrderDetailPage } from '../pages/my/order-detail/order-detail';
import { ManualPage } from '../pages/my/manual/manual';
import { AboutPage } from '../pages/my/about/about';
import { AuthPage } from '../pages/my/auth/auth';
import { RegisterPage } from '../pages/my/register/register';
import { BillDetailPage } from '../pages/my/bill-detail/bill-detail';
import { FreshOrderPage } from '../pages/fresh-order/fresh-order';
import {ChargingStandardPage} from "../pages/charging-standard/charging-standard";
import {WelcomeBackPage} from "../pages/welcome-back/welcome-back";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {RoomSelectorComponent} from "../components/room-selector.component";

/* 供应商组件 */
import { DfEstateService } from '../providers/df-estate.service';
import {AlertService} from "../providers/alert.service";
import {ToastService} from "../providers/toast.service";
import {UserDataService} from '../providers/user-data.service';

/* 管道 */
import { CostTypePipe } from "../pipes/cost-type.pipe";
import { DebitNoteStatePipe } from "../pipes/debit-note-state.pipe";


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    ParkingPage,
    GshpPage,
    EstatePage,
    MyPage,
    TabsPage,
    ProfilePage,
    AccountBalancePage,
    BillPage,
    OrderPage,
    OrderDetailPage,
    ManualPage,
    AboutPage,
    AuthPage,
    RegisterPage,
    BillDetailPage,
    CostTypePipe,
    DebitNoteStatePipe,
    FreshOrderPage,
    ChargingStandardPage,
    WelcomeBackPage,
    ContactUsPage,
    RoomSelectorComponent
  ],
  imports: [
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    }, {
      links: [
        {component: WelcomeBackPage, name: 'WelcomeBack', segment: 'welcome-back/:openId/:avatar/:nickname/:roomId'},
        {component: RegisterPage, name: 'Register', segment: 'register/:openId/:avatar/:nickname'},
        {component: RegisterPage, name: 'AddRoom', segment: 'add-room'},
        {component: BillPage, name: 'Bill', segment: 'bill'},
        {component: ChargingStandardPage, name: 'ChargingStandard', segment: 'charging-standard'},
        {component: AuthPage, name: 'Auth', segment: 'auth'},
        {component: ContactUsPage, name: 'ContactUs', segment: 'contact-us'},
        {component: ManualPage, name: 'Manual', segment: 'manual'}
      ]
    }),
    BrowserModule,
    IonicStorageModule.forRoot({
      name: '_ionickv',
      driverOrder: ['indexeddb', 'websql']
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ParkingPage,
    GshpPage,
    MyPage,
    EstatePage,
    TabsPage,
    ProfilePage,
    AccountBalancePage,
    BillPage,
    OrderPage,
    OrderDetailPage,
    ManualPage,
    AboutPage,
    AuthPage,
    RegisterPage,
    BillDetailPage,
    FreshOrderPage,
    ChargingStandardPage,
    WelcomeBackPage,
    ContactUsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DfEstateService,
    AlertService,
    ToastService,
    UserDataService
  ]
})
export class AppModule {}

