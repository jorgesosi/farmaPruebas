import { Dataservice } from './../../providers/dataservice';
import { FarmaciasAbiertasPage } from './../farmacias-abiertas/farmacias-abiertas';
import { FarmaciasDeTurnoPage } from './../farmacias-de-turno/farmacias-de-turno';
import { FarmaciaPage } from './../farmacia/farmacia';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MapaPage } from "../mapa/mapa";
import { Lista2Page } from '../lista2/lista2';
import { MapaTurnosPage } from '../mapa-turnos/mapa-turnos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public dataService:Dataservice) {

  }
  
  mostrarFarmacias(){
    //this.navCtrl.push(Lista2Page)
    //this.navCtrl.push(FarmaciaPage)

    let modal = this.modalCtrl
    .create(MapaPage, {tipo:'todo'});
    modal.present();
   // modal._onDidDismiss(()=>{
      //this.restaurantes = this.restauranteService.cargarRestaurantes();
    //})
  }
  mostrarMapa(){
    //this.navCtrl.push(MapaPage)
    this.navCtrl.push(MapaPage,{tipo:'todo'})
  }
  mostrarFarmaciasAbiertas(){
    //this.navCtrl.push(FarmaciasAbiertasPage)
  }
  mostrarMapaTurnos(){
    this.navCtrl.push(MapaPage,{tipo:'turno'})
    //this.navCtrl.push(MapaTurnosPage)
    //this.navCtrl.push(FarmaciasDeTurnoPage)
  }
  mostrarListaFarmacias(){
    let modal = this.modalCtrl
    //.create(FarmaciaPage);
    .create(MapaPage, {tipo:'turno'});
    modal.present();
    
  }
  
  

}
