import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmaciasAbiertasPage } from './farmacias-abiertas';

@NgModule({
  declarations: [
    FarmaciasAbiertasPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmaciasAbiertasPage),
  ],
})
export class FarmaciasAbiertasModule {}
