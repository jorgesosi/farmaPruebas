import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from "@ionic-native/geolocation";
import { Dataservice } from '../../providers/dataservice';
@Component({
  selector: 'page-farmacia',
  templateUrl: 'farmacia.html',
})
export class FarmaciaPage {
  ubicacion ={lat:-41.138151,lng:-71.297480};
  public markers=[]
  public marcadores=[]
  public dateFormat = require('dateformat');
  turno=[];
  turno1=[];
  turno2=[];
  public turno3=[];
  icono=[];
  contador=0;
   public id1='';
   public id2='';
   public id3='';
   public  dia;
   public Tid1='';
   public Tid2='';
   public Tid3='';
   public  Tdia;
   public string;
   public hoy=this.dateFormat(new Date(),"dd-mm");

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private geolocation: Geolocation,
              public dataService: Dataservice ) {
                this.turno2=[];
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Farmacia');

    //this.estadeTurno();
   
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
    this.dataService.obtenerdatos().subscribe(
      (datos)=>{
        this.markers=datos;
      }
    );
   /* this.dataService.obtenerturnos().subscribe(
      (datos)=>{
        this.turno=datos;
        console.log(this.turno)
        let contador=0;
        this.hoy=this.hoy.toString();
        for(let item of this.turno ) {
          if(this.hoy==item.dia){
            console.log(this.hoy,contador, item.dia);
            this.Tid1=item.idFarma1;
            this.Tid2=item.idFarma2;
            this.Tid3=item.idFarma3;
          }
        
         contador++;
         //this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
        }
      }
    );*/
    //let prueba=this.seleccionarIcono(12);
    //console.log("prueba",prueba);
    /*this.dataService.obtenerFarmaciasdeturno().subscribe((farma)=>{
      this.turno2=farma;
    });*/
    
  }
     seleccionarIcono(turnoId:number){
      this.dataService.obtenerturnos().subscribe(
        (datos)=>{
          this.turno=datos;
          console.log(this.turno)
          let contador=0;
          this.hoy=this.hoy.toString();
          for(let item of this.turno ) {
            if(this.hoy==item.dia){
              console.log(this.hoy,contador, item.dia);
              this.Tid1=item.idFarma1;
              this.Tid2=item.idFarma2;
              this.Tid3=item.idFarma3;
              console.log(this.Tid3)
            }
          
           contador++;
           //this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
          }
        }
      );
       console.log("selec",this.Tid1)
      for(let i=0;i<this.turno3.length;i++){
         console.log("la i",i);
       }
      if (Number(turnoId) == Number(this.Tid1)||Number(turnoId) ==Number(this.Tid2)||Number(turnoId) ==Number(this.Tid3)){//|| this.turno2[i].id==this.Tid2||this.turno2[i].id==this.Tid3
        //console.log("primer for"); 
        this.string="assets/icon/marker-blue.png";
        console.log("primer for", this.string);
        //return false;
      }else{
        this.string="assets/icon/marker-blue.png";
        console.log("primer for else", this.string);
        //return true;
      }

      /*let hoy=this.dateFormat(new Date(),"dd-mm");
      let ayer = new Date(new Date().setDate(new Date().getDate()-1));
      let now = new Date();
      ayer=this.dateFormat(ayer,"dd-mm");
      now= this.dateFormat(now,"HHMM");
      let cero= 0;
      let uno = 900;
      console.log("turno2 en seleccionar icono", this.turno3)
      if((Number(now)>Number(cero))&&(Number(now)<Number(uno))){
        hoy=ayer;
      }*/
     /* this.dataService.obtenerturnos().subscribe(
        (datos)=>{
          this.turno=datos;
          for(let item of this.turno) {
            this.dia=item.dia;
            this.id1=item.idFarma1;
            this.id2=item.idFarma2;
            this.id3=item.idFarma3;
            this.hoy=this.hoy.toString();
            this.dia=this.dia.toString();
            if(this.hoy==this.dia){ 
              this.Tdia=this.dia;
              this.Tid1=this.id1;
              this.Tid2=this.id2;
              this.Tid3=this.id3;
              console.log("dia", this.Tdia)
              if (Number(turnoId) == Number(this.Tid1)||Number(turnoId) ==Number(this.Tid2)||Number(turnoId) ==Number(this.Tid3)){//|| this.turno2[i].id==this.Tid2||this.turno2[i].id==this.Tid3
                //console.log("primer for"); 
                this.string="assets/icon/marker-blue.png";
                console.log("primer for", this.string);
                //return false;
              }else{
                this.string="assets/icon/marker-blue.png";
                console.log("primer for else", this.string);
                //return true;
              }
            }
          }
          console.log("fuera del for", this.string);
          return this.string;
        }) */
        console.log("fuera del servicio for", this.string);  
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
      hoy=ayer;
    }
    hoy=hoy.toString();
    if(hoy==dia){    
      this.dataService.obtenerFarmaciasdeturno().subscribe((farma)=>{
        this.turno1=farma;
        for(let datos of this.turno1 ){//busca las farmacias de turno 24 hs
          if (datos.id==id1|| datos.id==id2||datos.id==id3){
            this.turno2.push(datos);
          }
        }
      })
      
    }
  } 
}
