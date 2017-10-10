import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Farmacias } from './../../clases/farmacias';
import { Dataservice } from './../../providers/dataservice';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  observableFarmacias: Observable<Farmacias[]>
  farmas: Farmacias[];
  farmacias = [];
  public dateFormat = require('dateformat');//se instalo el modudulo de npm dateformat para poder 
  public contador:number=0;
  public start:string="";
  public end:string="";
  public start2:string="";
  public end2:string="";
  //public isOpen:boolean=true;
  public isLV:Boolean=true;
  public isS:boolean=true;
  public isD:boolean=true;
  public abierto = [];
  public abierto1 = [];
  public now = new Date();
  public today = "";
  public numeroDia=this.dateFormat(this.now,"N");//dar formato a las horas ya que lo anterior de js no funcionaba
  public nombreDia=this.dateFormat(this.now,"dd-mm");
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Dataservice) {
  }
 
  ionViewWillEnter(){
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
          this.abierto1 [this.contador] = this.estaAbierto1(this.start, this.end, this.start2, this.end2);
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
        console.log(this.nombreDia);
      })
     
    //this.estaAbierto();
    // este codigo lo uticice para cargar los datos en la clase, pero como queda cerrado
    // no pude recorrerlo con la funcion de esta abierto
    this.contador=0;
    this.observableFarmacias = this.dataService.obtenerdatos2();
    this.observableFarmacias.subscribe(
      farmas => this.farmas=farmas
    )
    if(this.numeroDia>=1 && this.numeroDia<=5){
      this.isLV=true;
      this.isS=false;
      this.isD=false;
    }
    if(this.numeroDia==6){
      this.isLV=false;
      this.isS=true;
      this.isD=false;
    }
    if(this.numeroDia==7){
      this.isLV=false;
      this.isS=false;
      this.isD=true;
    }
  }
  estaAbierto (abre:string, cierra:string, abre1: string, cierra1: string){
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
      return "Abierto";
    }else{
      return "Cerrado";
    }
  }
  estaAbierto1 (abre:string, cierra:string, abre1: string, cierra1: string){
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
