import { Turnos } from './../clases/turnos';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Farmacias } from './../clases/farmacias';
/*
  Generated class for the Dataservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Dataservice {
  public dateFormat = require('dateformat');
  public farma: Farmacias[]= [];
  //public turnos:Turnos[]=[];
  public turnos=[];
  public hoy=this.dateFormat(new Date(),"dd-mm");
  constructor(public http: Http) {
    console.log('Hello Dataservice Provider');
  }

  obtenerdatos(){
    return this.http.get('assets/markers/prueba.json')
    .map((response) => response.json()
    )
  }

obtenerturnos(){
  return this.http.get('assets/markers/turnos.json')
  .map((response) => response.json()
  )
}
obtenerFarmaciasdeturno(){
  return this.http.get('assets/markers/prueba.json')
  .map((response) => response.json()
)
}
  obtenerdatos2(): Observable<Farmacias[]>{
    return this.http.get('assets/markers/prueba.json')
      .map(res=>res.json()
      )
  }
 turnoget(){
   return this.turnos;
 }
  cargarTurno(){
   
    this.obtenerturnos().subscribe(
      (datos)=>{
         let turno=datos;
        console.log(turno)
        
        this.hoy=this.hoy.toString();
        for(let item of turno ) {
          if(this.hoy==item.dia){
            console.log(this.hoy, item.dia);
            this.turnos[0]= item.idFarma1;
            this.turnos[1]= item.idFarma2;
            this.turnos[2]=item.idFarma3;
            console.log("turnos data : ", this.turnos[1], this.turnos.length);
          }
         //this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
        }
      }
      
    );
    //this.turnos=Array;
    //console.log("claseturnos: ", this.turnos)
  }

}
