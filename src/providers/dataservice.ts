import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Dataservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Dataservice {

  constructor(public http: Http) {
    console.log('Hello Dataservice Provider');
  }
  obtenerdatos(){
    return this.http.get('assets/markers/prueba.json').map(
      (response) => response.json()
    ) 
  }

}
