import { FarmaciaPage } from './../farmacia/farmacia';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MapaPage } from "../mapa/mapa";
import { Lista2Page } from '../lista2/lista2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController) {

  }
  mostrarFarmacias(){
    this.navCtrl.push(Lista2Page)
  }
  mostrarMapa(){
    this.navCtrl.push(MapaPage)
  }
  mostrarListaFarmacias(){
    let modal = this.modalCtrl
    .create(FarmaciaPage);

    modal.present();
    
  }
  

}
