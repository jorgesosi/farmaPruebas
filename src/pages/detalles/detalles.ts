import { NavController, NavParams, Platform, ToastController, ViewController} from 'ionic-angular';
import { Component } from '@angular/core';
import { GoogleMaps, GoogleMap,
  GoogleMapsEvent, GoogleMapOptions, LatLng,
  CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from "@ionic-native/geolocation";
import { AgmCoreModule } from '@agm/core';
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {
  tabBarElement:any;//oculta la tab bar en sub pages
markers=[];
mapa: GoogleMap;
mapElement: HTMLElement;
myPosition: any = {};
latlng={lat:-41.135893,lng:-71.310535};

constructor( public navParams: NavParams,
  public toastCtrl: ToastController,
  private googleMaps: GoogleMaps,
  private geolocation: Geolocation,
  public viewCtrl:ViewController,
  private platform: Platform) {
this.platform.ready().then(() => {
//this.loadMap();
});
  //para ocultar las tabs
  this.tabBarElement= document.querySelector('.tabbar.show-tabbar');
   
  this.markers =  navParams.get('item');
    console.log(this.markers);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detalles');
    this.getCurrentPosition();
  }

  ionViewWillEnter() { this.tabBarElement.style.display = 'none'; } 
  ionViewWillLeave() { this.tabBarElement.style.display = 'flex'; }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();// load de geolocalizacion 
    })
    .catch(error=>{
      //console.log(error);
      let toast = this.toastCtrl.create({
        message: error,
        duration:2000
      });
      toast.present();
    })
  }

  loadMap() {
    this.mapElement = document.getElementById('mapa');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
        zoom: 14,
        tilt: 30
      }
    };
    this.mapa = this.googleMaps.create(this.mapElement, mapOptions);
    
    this.mapa.one(GoogleMapsEvent.MAP_READY) 
    .then(() => {
      
      //console.log('Map is ready!');
      let toast = this.toastCtrl.create({
        message:'Map is ready',
        duration:2000
      });
      toast.present();
      // Now you can use all methods safely.
      let markerOptions: MarkerOptions = {
        position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),//position: this.myPosition,
        //title: "Hello",
        icon: {url:"./assets/icon/marker-green.png"}
      };
      this.mapa.addMarker(markerOptions);
      //crear el marcador de la farma
      this.addMarker(this.markers);
      /*this.markers.forEach(marker=>{
        this.addMarker(marker);  
      });*/
     
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
      icon: options.icon //{"url":"./assets/icon/marker-green.png"}
    };
    /*let toast = this.toastCtrl.create({
      message:icono,
      duration:2000
    });
    toast.present();*/
    this.mapa.addMarker(markerOptions);
    
  }

  ionViewWillUnload(){
    this.mapa.clear();
  }

}
/*
ionViewWillEnter() { this.tabBarElement.style.display = 'none'; } 
ionViewWillLeave() { this.tabBarElement.style.display = 'flex'; }
*/