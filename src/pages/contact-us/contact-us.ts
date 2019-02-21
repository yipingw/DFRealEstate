import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ContactUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html'
})
export class ContactUsPage implements OnInit {
  contacts: {name: string, phone: string}[];

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.contacts = [];
    this.contacts.push({name: '东风阳光城', phone: '027-84288060'});
    this.contacts.push({name: '东风阳光城四期', phone: '027-84288968'});
    this.contacts.push({name: '东风阳光城湖景苑', phone: '027-84288900'});
    this.contacts.push({name: '东风凤凰城', phone: '027-84756868'});
  }

  ionViewDidLoad() {
    console.log('Hello ContactUsPage Page');
  }

}
