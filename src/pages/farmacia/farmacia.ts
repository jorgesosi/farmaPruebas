import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-farmacia',
  templateUrl: 'farmacia.html',
})
export class FarmaciaPage {
  ubicacion ={lat:0,lng:0}
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private geolocation: Geolocation) {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Farmacia');
    this.geolocation.getCurrentPosition({ timeout: 6000})
    .then(info=>{
      this.ubicacion.lat= info.coords.latitude,
      this.ubicacion.lng= info.coords.longitude
     })
    .catch(error=>{
      let toast = this.toastCtrl.create({
        message:'No se pudo encontrar la ubicación',
        duration:2000
      });
      toast.present();
    })
  }
  
}
