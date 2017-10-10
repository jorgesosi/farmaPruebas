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
  public farma: Farmacias[]= [];
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

  obtenerdatos2(): Observable<Farmacias[]>{
    return this.http.get('assets/markers/prueba.json')
      .map(res=>
       res.json()
      )
  }

}
