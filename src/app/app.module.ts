import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FarmaciaPage } from "../pages/farmacia/farmacia";
import { MapaPage } from './../pages/mapa/mapa';
import { ListaPage } from "../pages/lista/lista";
import { Lista2Page } from './../pages/lista2/lista2';

import { Dataservice } from './../providers/dataservice';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap,
  GoogleMapsEvent, GoogleMapOptions, 
  CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FarmaciaPage,
    TabsPage,
    MapaPage,
    ListaPage,
    Lista2Page
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCNEBSpmaD6bW2hDCCCzhATmCY8Rwn8ffY'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FarmaciaPage,
    TabsPage,
    MapaPage,
    ListaPage,
    Lista2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GoogleMaps,
    Dataservice
  
  ]
})
export class AppModule {}
