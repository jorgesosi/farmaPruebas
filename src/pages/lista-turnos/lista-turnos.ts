import { DetallesPage } from './../detalles/detalles';
import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Dataservice } from './../../providers/dataservice';
@Component({
  selector: 'page-lista-turnos',
  templateUrl: 'lista-turnos.html',
})
export class ListaTurnosPage implements OnInit{
  public dateFormat = require('dateformat');//se instalo el modudulo de npm dateformat para poder 
  //public hoy=this.dateFormat(new Date(),"dd-mm");
  public farmacias = [];
  public farmacias1 = [];
  public turno = [];
  public turno1 = [];
  public turno2 = [];
  public farmaciasTurno = [];
 
  
  
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dataService: Dataservice) {
      this.turno2=[];
  }

  ngOnInit(): void {
    
    this.dataService.obtenerturnos().subscribe(
      (datos)=>{
        this.turno=datos;
        for(let item of this.turno) {
          this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
        }
      }
    );
  }


  ionViewDidLoad() {}


  detalles(item:any){
    this.navCtrl.push(DetallesPage,{item});
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
          if (datos.id==id1|| datos.id==id2){
            this.turno2.push(datos);
          }
        }
        for(let datos of this.turno1 ){//Busca la farmacia de turno hasta 23 hs
          if (datos.id==id3){
            this.turno2.push(datos);
            console.log(this.turno2);
          }
        }
      })
      
    }
  }
}
