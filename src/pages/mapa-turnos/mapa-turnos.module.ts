import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaTurnosPage } from './mapa-turnos';

@NgModule({
  declarations: [
    MapaTurnosPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaTurnosPage),
  ],
})
export class MapaTurnosModule {}
