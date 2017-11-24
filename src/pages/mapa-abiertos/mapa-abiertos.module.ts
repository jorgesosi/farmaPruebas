import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaAbiertosPage } from './mapa-abiertos';

@NgModule({
  declarations: [
    MapaAbiertosPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaAbiertosPage),
  ],
})
export class MapaAbiertosModule {}
