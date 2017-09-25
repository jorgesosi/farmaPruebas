import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dataservice } from '../../providers/dataservice';

@Component({
  selector: 'page-lista2',
  templateUrl: 'lista2.html',
})
export class Lista2Page {
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
mostrarFarmacia(restaurante, rid){}
}
