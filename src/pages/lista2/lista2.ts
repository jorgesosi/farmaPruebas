import { DetallesPage } from './../detalles/detalles';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dataservice } from '../../providers/dataservice';

@Component({
  selector: 'page-lista2',
  templateUrl: 'lista2.html',
})
export class Lista2Page {
  public farmacias = [];
  public dateFormat = require('dateformat');//se instalo el modudulo de npm dateformat para poder 
  public contador:number=0;
  public start:string="";
  public end:string="";
  public start2:string="";
  public end2:string="";
  public isLV:Boolean=true;
  public isS:boolean=true;
  public isD:boolean=true;
  public abierto = [];
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
        //console.log("Foto1: ",data.image[0].imagen0);
        if(this.numeroDia>=1 && this.numeroDia<=5){
          //console.log(data)
          this.start=data.horario.lv[0].start1;
          this.end=data.horario.lv[1].end1;
          this.start2=data.horario.lv[2].start2;
          this.end2=data.horario.lv[3].end2;
          this.abierto[this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          this.contador ++;
        }else if(this.numeroDia ==6){
          console.log("sabado");
          this.start=data.horario.s[0].start1;
          this.end=data.horario.s[1].end1;
          this.start2=data.horario.s[2].start2;
          this.end2=data.horario.s[3].end2;
          console.log(this.start,this.end,this.start2, this.end2 );
          this.abierto[this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          this.contador ++;
        }else{
          //console.log("domingo");
          this.start=data.horario.d[0].start1;
          this.end=data.horario.d[1].end1;
          this.start2=data.horario.d[2].start2;
          this.end2=data.horario.d[3].end2;
          this.abierto[this.contador] = this.estaAbierto(this.start, this.end, this.start2, this.end2);
          this.contador ++;
        }
      }
    })
    this.contador=0;
    console.log(this.abierto);
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

  detalles(item:any){
    this.navCtrl.push(DetallesPage,{item});
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
mostrarFarmacia(restaurante, rid){}
}
