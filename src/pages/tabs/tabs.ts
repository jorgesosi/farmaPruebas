import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { FarmaciaPage } from "../farmacia/farmacia";
import { ListaPage } from './../lista/lista';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FarmaciaPage;
  tab3Root = ListaPage;

  constructor() {

  }
}
