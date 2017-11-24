import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-mapa-abiertos',
  templateUrl: 'mapa-abiertos.html',
})
export class MapaAbiertosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaAbiertos');
  }

}
