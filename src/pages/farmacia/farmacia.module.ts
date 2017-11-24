import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmaciaPage } from './farmacia';

@NgModule({
  declarations: [
    FarmaciaPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmaciaPage),
  ],
})
export class FarmaciaModule {}
