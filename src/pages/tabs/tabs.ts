import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { FarmaciaPage } from "../farmacia/farmacia";
import { ListaPage } from './../lista/lista';
import { Lista2Page } from '../lista2/lista2';
import { ListaTurnosPage } from './../lista-turnos/lista-turnos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListaPage;
  tab3Root = ListaTurnosPage;
  tab4Root = Lista2Page;

  constructor() {

  }
}
