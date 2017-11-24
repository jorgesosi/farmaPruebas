import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmaciasDeTurnoPage } from './farmacias-de-turno';

@NgModule({
  declarations: [
    FarmaciasDeTurnoPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmaciasDeTurnoPage),
  ],
})
export class FarmaciasDeTurnoModule {}
