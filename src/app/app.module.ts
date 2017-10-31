import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FarmaciaPage } from "../pages/farmacia/farmacia";
import { MapaPage } from './../pages/mapa/mapa';
import { ListaPage } from "../pages/lista/lista";
import { Lista2Page } from './../pages/lista2/lista2';
import { ListaTurnosPage } from './../pages/lista-turnos/lista-turnos';
import { FarmaciasDeTurnoPage } from './../pages/farmacias-de-turno/farmacias-de-turno';
import { DetallesPage } from './../pages/detalles/detalles';
import { FarmaciasAbiertasPage } from './../pages/farmacias-abiertas/farmacias-abiertas';
import { MapaTurnosPage } from './../pages/mapa-turnos/mapa-turnos';
import { MapaAbiertosPage } from './../pages/mapa-abiertos/mapa-abiertos';

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
    HomePage,
    FarmaciaPage,
    TabsPage,
    MapaPage,
    ListaPage,
    Lista2Page,
    ListaTurnosPage,
    MapaAbiertosPage,
    MapaTurnosPage,
    FarmaciasDeTurnoPage,
    FarmaciasAbiertasPage,
    DetallesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,
      { tabsHideOnSubPages: true }
    ),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCNEBSpmaD6bW2hDCCCzhATmCY8Rwn8ffY'}),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    HomePage,
    FarmaciaPage,
    TabsPage,
    MapaPage,
    ListaPage,
    Lista2Page,
    ListaTurnosPage,
    MapaAbiertosPage,
    MapaTurnosPage,
    FarmaciasDeTurnoPage,
    FarmaciasAbiertasPage,
    DetallesPage
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
