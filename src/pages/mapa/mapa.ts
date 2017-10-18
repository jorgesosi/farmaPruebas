import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMap,
   GoogleMapsEvent, GoogleMapOptions, LatLng,
   CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { Geoposition } from "@ionic-native/geolocation";
import { Dataservice } from '../../providers/dataservice';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  markers=[]
  map: GoogleMap;
  mapElement: HTMLElement;
  myPosition: any = {};
  latlng={lat:-41.135893,lng:-71.310535};
  public turno=[];
  turno1=[]
  turno2=[]
  public dateFormat = require('dateformat');

 
  turno3=[]
  turno4=[]
   public id1='';
   public id2='';
   public id3='';
   public  dia;
   public Tid1='';
   public Tid2='';
   public Tid3='';
   public  Tdia;
   public hoy=this.dateFormat(new Date(),"dd-mm");


  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public toastCtrl: ToastController,
               private googleMaps: GoogleMaps,
               private geolocation: Geolocation,
               public dataService: Dataservice,
               private platform: Platform) {
    this.platform.ready().then(() => {
      //this.loadMap();
    });   
   }
      
  ionViewDidLoad() {
    console.log('ionViewDidLoad Mapa');
    this.getCurrentPosition();
    this.dataService.obtenerdatos().subscribe(
      (datos)=>{
      	this.markers=datos;
      }
    );
    
    //this.loadMap();
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
        zoom: 14,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      //console.log('Map is ready!');
      let toast = this.toastCtrl.create({
        message:'Map is ready',
        duration:2000
      });
      toast.present();
      // Now you can use all methods safely.
      let markerOptions: MarkerOptions = {
        //position: this.myPosition,
        //title: "Hello",
        position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
        icon: {"url":"./assets/icon/marker-green.png"}
      };
      this.map.addMarker(markerOptions);
      
      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
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
  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.lat, options.lng),
      title: options.nombre,
      icon: options.icon
      //icon:this.seleccionarIcono(options.id)
    };
    this.map.addMarker(markerOptions);
  }
  seleccionarIcono(turnoId:number){
    
    let ayer = new Date(new Date().setDate(new Date().getDate()-1));
    let now = new Date();
    
     ayer=this.dateFormat(ayer,"dd-mm");
     now= this.dateFormat(now,"HHMM");
     let cero= 0;
     let uno = 900;
      this.dataService.obtenerturnos().subscribe(
      (datos)=>{
        this.turno=datos;
        for(let item of this.turno) {
          this.dia=item.dia;
          this.id1=item.idFarma1;
          this.id2=item.idFarma2;
          this.id3=item.idFarma3;
          if((Number(now)>Number(cero))&&(Number(now)<Number(uno))){
            this.hoy=ayer;
          }
          this.hoy=this.hoy.toString();
          this.dia=this.dia.toString();
          if(this.hoy==this.dia){ 
            this.Tdia=this.dia;
            this.Tid1=this.id1;
            this.Tid2=this.id2;
            this.Tid3=this.id3;
            this.dataService.obtenerFarmaciasdeturno().subscribe((farma)=>{
              this.turno2=farma;
              for(let i=0;i<this.turno2.length;i++ ){//busca las farmacias de turno 24 hs
                if (Number(turnoId) ==Number(this.Tid1)||Number(turnoId) ==Number(this.Tid2)||Number(turnoId) ==Number(this.Tid3)){//|| this.turno2[i].id==this.Tid2||this.turno2[i].id==this.Tid3
                  //console.log("primer for"); 
                  return '{"url":"./assets/icon/marker-blue.png"}';
                }else{
                  //console.log("primer for else");
                  return '{"url":"./assets/icon/marker-pink.png"}';
                }
              }               
            });
          }
        }
      });
    
  }
}


