import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTurnosPage } from './lista-turnos';

@NgModule({
  declarations: [
    ListaTurnosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTurnosPage),
  ],
})
export class ListaTurnosModule {}
