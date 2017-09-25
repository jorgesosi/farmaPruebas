import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { Farmacias } from './../../clases/farmacias';
import { Dataservice } from './../../providers/dataservice';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  farmacias = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Dataservice) {
  }
 
  ionViewWillEnter(){
    this.dataService.obtenerdatos().subscribe(
      (datos)=>{
      	this.farmacias=datos;
        for(let data of this.farmacias) {
        console.log(data.nombre);
        console.log(data.image);
        }
      }
    );
}
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad Lista');
  }*/

}
