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
        for(let data of this.markers) {
        console.log(data.nombre);
        console.log(data.image);
        }
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
    };
    this.map.addMarker(markerOptions);
  }
}


