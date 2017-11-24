import { NavParams, Platform, ToastController, ViewController } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap,
  GoogleMapsEvent, GoogleMapOptions, LatLng,
  CameraPosition, MarkerOptions, Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { Geoposition } from "@ionic-native/geolocation";
import { Dataservice } from '../../providers/dataservice';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  markers = []
  map: GoogleMap;
  mapElement: HTMLElement;
  myPosition: any = {};
  latlng = { lat: -41.135893, lng: -71.310535 };
  tipo;
  tabBarElement: any;//oculta la tab bar en sub pages
  public turno = [];
  turno1 = []
  turno2 = []
  public dateFormat = require('dateformat');
  public now = new Date();
  //public hoy=this.dateFormat(new Date(),"dd-mm");
  public numeroDia = this.dateFormat(this.now, "N");

  turno3 = []
  turno4 = []
  public id1 = '';
  public id2 = '';
  public id3 = '';
  public dia;
  public Tid1 = '';
  public Tid2 = '';
  public Tid3 = '';
  public Tdia;



  constructor(public navParams: NavParams,
    public toastCtrl: ToastController,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public dataService: Dataservice,
    public viewCtrl: ViewController,
    private platform: Platform) {
    this.platform.ready().then(() => {
      //this.loadMap();
    });
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tipo = navParams.get('tipo');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mapa');
    //this.getCurrentPosition();

    if (this.tipo == 'todo') {
      this.markers = [];
      this.getCurrentPosition();
      let toast = this.toastCtrl.create({
        message: 'todo',
        duration: 2000
      });
      toast.present();

      this.dataService.obtenerdatos().subscribe(
        (datos) => {
          this.markers = datos;
        }
      );

    } else if (this.tipo == 'turno') {
      this.markers = [];
      this.getCurrentPosition();
      let toast = this.toastCtrl.create({
        message: 'turno',
        duration: 2000
      });
      toast.present();

      this.dataService.obtenerturnos().subscribe(
        (datos) => {
          this.turno = datos;
          for (let item of this.turno) {
            this.estadeTurno(item.dia, item.idFarma1, item.idFarma2, item.idFarma3);
          }
        }
      );
    }

    /*this.dataService.obtenerdatos().subscribe(
      (datos)=>{
      	this.markers=datos;
      }
    );*/

    //this.loadMap();
  }
  ionViewWillEnter() { this.tabBarElement.style.display = 'none'; }
  ionViewWillLeave() { this.tabBarElement.style.display = 'flex'; }

  ionViewWillUnload() {
    this.map.clear();
  }
  getCurrentPosition() {
    this.geolocation.getCurrentPosition()
      .then(position => {
        this.myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.loadMap();// load de geolocalizacion 
      })
      .catch(error => {
        //console.log(error);
        let toast = this.toastCtrl.create({
          message: error,
          duration: 2000
        });
        toast.present();
      })
  }
  loadMap() {
    this.mapElement = document.getElementById('map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
        zoom: 14,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    //this.map.one(GoogleMapsEvent.MAP_READY)
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        //console.log('Map is ready!');
        let toast = this.toastCtrl.create({
          message: 'Map is ready',
          duration: 2000
        });
        toast.present();
        // Now you can use all methods safely.
        let markerOptions: MarkerOptions = {
          position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),//position: this.myPosition,
          //title: "Hello",
          icon: { url: "./assets/icon/marker-green.png" }
        };
        this.map.addMarker(markerOptions);

        this.markers.forEach(marker => {
          //let icono= 'blue';
          let icono = this.seleccionarIcono(marker)
          this.addMarker(marker, icono);

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
  addMarker(options, icono) {
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.lat, options.lng),
      //title: options.nombre,
      title:
        options.nombre + '\n'
        + 'Dirección\n' + options.direccion
        + '\nHorarios:\n Lunes a Viernes\n' + options.horario.lv[0].start1 + ' ' + options.horario.lv[1].end1 + ' ' +
        options.horario.lv[2].start2 + ' ' + options.horario.lv[3].end2 +
        '\n Sabado\n' +
        options.horario.s[0].start1 + ' ' + options.horario.s[1].end1 + ' ' +
        options.horario.s[2].start2 + ' ' + options.horario.s[3].end2 +
        '\n Domingo\n' +
        options.horario.d[0].start1 + ' ' + options.horario.d[1].end1 + ' ' +
        options.horario.d[2].start2 + ' ' + options.horario.d[3].end2 ,       
      
      styles: {
        'text-align': 'center',
        'font-style': 'italic',
        'font-weight': 'bold',
        'color': 'black'
      },
      icon: icono

    };
    /*let toast = this.toastCtrl.create({
      message:icono,
      duration:2000
    });
    toast.present();*/
    this.map.addMarker(markerOptions);

  }

  seleccionarIcono(options): any {
    //console.log("estaAbierto()")
    //this.dateFormat.masks.hammerTime = 'HH:MM';
    let hoy = this.dateFormat(this.now, "HH:MM");
    //start=this.dateFormat(start,"HH:MM");
    hoy = hoy.toString();
    hoy = hoy.replace(":", "");
    let abre = options.horario.lv[0].start1;
    let cierra = options.horario.lv[1].end1;
    let abre1 = options.horario.lv[2].start2;
    let cierra1 = options.horario.lv[3].end2;
    abre = abre.replace(":", "");
    cierra = cierra.replace(":", "");
    abre1 = abre1.replace(":", "");
    cierra1 = cierra1.replace(":", "");
    //if de dia
    if (this.numeroDia >= 1 && this.numeroDia <= 5) {
      let abre = options.horario.lv[0].start1;
      let cierra = options.horario.lv[1].end1;
      let abre1 = options.horario.lv[2].start2;
      let cierra1 = options.horario.lv[3].end2;
      abre = abre.replace(":", "");
      cierra = cierra.replace(":", "");
      abre1 = abre1.replace(":", "");
      cierra1 = cierra1.replace(":", "");
    } else if (this.numeroDia == 6) {
      //muestra por pantalla si entra a lav
      let toast = this.toastCtrl.create({
        message: 's ',
        duration: 2000
      });
      toast.present();//borrar despues de pruebas
      let abre = options.horario.s[0].start1;
      let cierra = options.horario.s[1].end1;
      let abre1 = options.horario.s[2].start2;
      let cierra1 = options.horario.s[3].end2;
      abre = abre.replace(":", "");
      cierra = cierra.replace(":", "");
      abre1 = abre1.replace(":", "");
      cierra1 = cierra1.replace(":", "");
    } else {
      //muestra por pantalla si entra a lav
      let toast = this.toastCtrl.create({
        message: 'd',
        duration: 2000
      });
      toast.present();//borrar despues de pruebas
      let abre = options.horario.d[0].start1;
      let cierra = options.horario.d[1].end1;
      let abre1 = options.horario.d[2].start2;
      let cierra1 = options.horario.d[3].end2;
      abre = abre.replace(":", "");
      cierra = cierra.replace(":", "");
      abre1 = abre1.replace(":", "");
      cierra1 = cierra1.replace(":", "");
    }
    //fin if de dia
    //console.log('today: '+hoy+' abre: '+ abre+ ' cierra: '+cierra);
    if ((Number(hoy) > Number(abre) && Number(hoy) < Number(cierra)) || (Number(hoy) > Number(abre1) && Number(hoy) < Number(cierra1))) {//this.today>this.start && this.today<this.end
      //options.setIcon({'url':'www/assets/icon/marker-green.png'});
      let icono = "./assets/icon/cruzVerde.png";
      return icono;
      //icon: {url:"./assets/icon/marker-green.png"}
    } else {
      // options.setIcon({'url':'www/assets/icon/marker-green.png'});
      let icono = "./assets/icon/cruzRoja.png";
      return icono;
    }

  }

  //borrar para limpiar codigo

  estadeTurno(dia: string, id1: string, id2: string, id3: string) {
    //console.log("estadeTurno()");
    let hoy = this.dateFormat(new Date(), "dd-mm");
    let ayer = new Date(new Date().setDate(new Date().getDate() - 1));
    let now = new Date()
    ayer = this.dateFormat(ayer, "dd-mm");
    now = this.dateFormat(now, "HHMM");
    let cero = 0;
    let uno = 900;
    //cero=this.dateFormat(cero,"HHMM");
    //let hoy1=this.dateFormat(new Date(-1),"dd");

    if ((Number(now) > Number(cero)) && (Number(now) < Number(uno))) {
      hoy = ayer;
    }
    hoy = hoy.toString();
    if (hoy == dia) {
      this.dataService.obtenerFarmaciasdeturno().subscribe((farma) => {
        this.turno1 = farma;
        for (let datos of this.turno1) {//busca las farmacias de turno 24 hs
          if (datos.id == id1 || datos.id == id2) {
            this.markers.push(datos);
          }
        }
        for (let datos of this.turno1) {//Busca la farmacia de turno hasta 23 hs
          if (datos.id == id3) {
            this.markers.push(datos);
            console.log(this.turno2);
          }
        }
      })

    }
  }
}
/*let toast = this.toastCtrl.create({
        message:options,
        duration:2000
      });
      toast.present();*/
