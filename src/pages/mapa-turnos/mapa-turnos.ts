import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMap,
   GoogleMapsEvent, GoogleMapOptions, LatLng,
   CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from "@ionic-native/geolocation";
import { Dataservice } from '../../providers/dataservice';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-mapa-turnos',
  templateUrl: 'mapa-turnos.html',
})
export class MapaTurnosPage {
  public dateFormat = require('dateformat');//se instalo el modudulo de npm dateformat para poder 
  markers=[]
  map: GoogleMap;
  mapElement: HTMLElement;
  myPosition: any = {};
  latlng={lat:-41.135893,lng:-71.310535};
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public toastCtrl: ToastController,
               private googleMaps: GoogleMaps,
               private geolocation: Geolocation,
               public dataService: Dataservice,
               private platform: Platform) {
                 this.markers=[];
    this.platform.ready().then(() => {
      //this.loadMap();
    });   
   }
      
  ionViewDidLoad() {
    console.log('ionViewDidLoad Mapa');
   this.getCurrentPosition();
    /*this.dataService.obtenerdatos().subscribe(
      (datos)=>{
      	this.markers=datos;
        for(let data of this.markers) {
        console.log(data.nombre);
        console.log(data.image);
        }
      }
    );*/
  this.loadMap();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      console.log(error);
    })
  }
  loadMap() {
    this.mapElement = document.getElementById('map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        //target: {
          //lat: info.coords.latitude,//-41.135893,
          //lng: info.coords.longitude//-71.310535
        //},
        target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
        //target: new LatLng(this.latlng.lat, this.latlng.lng),
        zoom: 14,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
  
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      //console.log('Map is ready!');
      let toast = this.toastCtrl.create({
        message:'Mapa listo',
        duration:2000
      });
      toast.present();

      // Now you can use all methods safely.

     let markerOptions: MarkerOptions = {
        //position: this.myPosition,
        //title: "Hello",
        position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
        icon: {"url":"./assets/icon/marker-blue.png"}
        };

      this.map.addMarker(markerOptions);
/*
      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
  */    
      /*
      this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: -41.135893,  
            lng: -71.310535
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            });
        });*/

    });
  }
 /* addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.lat, options.lng),
      title: options.nombre,
      icon: options.icon
    };
    this.map.addMarker(markerOptions);
  }*/
  estadeTurno (dia:string, id1:string, id2: string, id3: string){
    //console.log("estadeTurno()");
    let hoy=this.dateFormat(new Date(),"dd-mm");
    let ayer = new Date(new Date().setDate(new Date().getDate()-1));
    let now = new Date()
     ayer=this.dateFormat(ayer,"dd-mm");
     now= this.dateFormat(now,"HHMM");
     let cero= 0;
     let uno = 930;
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
        let turno1=farma;
        for(let datos of turno1 ){//busca las farmacias de turno 24 hs
          if (datos.id==id1|| datos.id==id2||datos.id==id3){
            this.markers.push(datos);
          }
        }
      })
      
    }
  }
}


