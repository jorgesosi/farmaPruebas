import { Dataservice } from './../../providers/dataservice';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { Geoposition } from "@ionic-native/geolocation";

@Component({
  selector: 'page-farmacias-abiertas',
  templateUrl: 'farmacias-abiertas.html',
})
export class FarmaciasAbiertasPage {
  public dateFormat = require('dateformat');//se instalo el modudulo de npm dateformat para poder 
  public now = new Date();
  public start:string="";
  public end:string="";
  public start2:string="";
  public end2:string="";
  public numeroDia=this.dateFormat(this.now,"N");//dar formato a las horas ya que lo anterior de js no funcionaba
  public contador:number=0;  
  public abierto1 = [];
  farmacias=[];
  public markers=[];
  ubicacion ={lat:-41.138151,lng:-71.297480};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    public dataService: Dataservice,
    private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmaciasAbiertas');
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
       // este codigo lo utilizo para recorrer el json y cargar los datos 
       //en un arreglo para abierto o cerrado 
      	this.farmacias=datos;
        for(let data of this.farmacias) {
        console.log("Foto1: ",data.image[0].imagen0);
        if(this.numeroDia>=1 && this.numeroDia<=5){
          this.start=data.horario.lv[0].start1;
          this.end=data.horario.lv[1].end1;
          this.start2=data.horario.lv[2].start2;
          this.end2=data.horario.lv[3].end2;
          //this.abierto [this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          this.abierto1 [this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          if(this.abierto1[this.contador]==true){
            this.markers.push(data);
          }
          this.contador ++;
        }else if(this.numeroDia ==6){
          console.log("sabado");
          this.start=data.horario.s[0].start1;
          this.end=data.horario.s[1].end1;
          this.start2=data.horario.s[2].start2;
          this.end2=data.horario.s[3].end2;
          console.log(this.start,this.end,this.start2, this.end2 );
          this.abierto1 [this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          this.contador ++;
        }else{
          //console.log("domingo");
          this.start=data.horario.d[0].start1;
          this.end=data.horario.d[1].end1;
          this.start2=data.horario.d[2].start2;
          this.end2=data.horario.d[3].end2;
          this.abierto1 [this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          this.contador ++;
        }
          

        }
        console.log(this.abierto1);
        //console.log(this.nombreDia);
      })
    
  }
  estaAbierto(abre:string, cierra:string, abre1: string, cierra1: string){
    //console.log("estaAbierto()")
    this.dateFormat.masks.hammerTime = 'HH:MM';
    let hoy =this.dateFormat(this.now, "HH:MM");
    //start=this.dateFormat(start,"HH:MM");
    hoy= hoy.toString();
    hoy= hoy.replace(":","");
    abre= abre.replace(":","");
    cierra= cierra.replace(":","");
    abre1= abre1.replace(":","");
    cierra1= cierra1.replace(":","");
    //console.log('today: '+hoy+' abre: '+ abre+ ' cierra: '+cierra);
    if((Number(hoy) > Number(abre) && Number(hoy) < Number(cierra))||(Number(hoy) > Number(abre1) && Number(hoy) < Number(cierra1))){//this.today>this.start && this.today<this.end
      
      return true;
    }else{
      return false;
    }
  }
}
