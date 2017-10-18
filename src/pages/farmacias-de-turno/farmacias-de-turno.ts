import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from "@ionic-native/geolocation";
import { Dataservice } from '../../providers/dataservice';
@Component({
  selector: 'page-farmacias-de-turno',
  templateUrl: 'farmacias-de-turno.html',
})
export class FarmaciasDeTurnoPage {
  ubicacion ={lat:-41.138151,lng:-71.297480};
  markers=[]
  public dateFormat = require('dateformat');//se instalo el modudulo de npm dateformat para poder 
  public farmacias = [];
  public farmacias1 = [];
  public turno = [];
  public turno1 = [];
  public turno2 = [];
  public info:boolean=false;
  public farmaciasTurno = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Dataservice,
              public toastCtrl: ToastController,
              private geolocation: Geolocation) {
                this.markers=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmaciasDeTurno');
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
    });
    this.dataService.obtenerturnos().subscribe(
      (datos)=>{
        this.turno=datos;
        for(let item of this.turno) {
          this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
        }
      }
    );
  }
  estadeTurno (dia:string, id1:string, id2: string, id3: string){
    //console.log("estadeTurno()");
    let hoy=this.dateFormat(new Date(),"dd-mm");
    let ayer = new Date(new Date().setDate(new Date().getDate()-1));
    let now = new Date()
     ayer=this.dateFormat(ayer,"dd-mm");
     now= this.dateFormat(now,"HHMM");
     let cero= 0;
     let uno = 900;
     //cero=this.dateFormat(cero,"HHMM");
    //let hoy1=this.dateFormat(new Date(-1),"dd");
    if((Number(now)>Number(cero))&&(Number(now)<Number(uno))){
      console.log("entre");
      hoy=ayer;
    }
    //let hoy1=this.hoy-1;
    console.log("cero= ",cero, "now: ",now);
    hoy=hoy.toString();
    if(hoy==dia){    
      this.dataService.obtenerFarmaciasdeturno().subscribe((farma)=>{
        this.turno1=farma;
        for(let datos of this.turno1 ){//busca las farmacias de turno 24 hs
          if (datos.id==id1 || datos.id==id2 || datos.id==id3){
            this.markers.push(datos);
          }
        }
      })
    }
  }

  clickedMarker(  index: number) {
    this.info = true;
    console.log(this.info);
  }

}
