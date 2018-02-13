import $ from 'jquery';
import api from './api';
import Store from './store';

import HeatDisplay from './components/HeatDisplay';
import Nav from './components/Nav';
import HeatingWidget from './components/HeatingWidget';
import LightList from './components/Lights';

export default class App {
  constructor( root ){
    this.$root = $(root);
    this.store = new Store;
    this.store.routeWrapper = this;
  }

  //Call this to render component
  render() {

    const HeaderWrapper = $(`<header></header>`)
    const Header = $(`<div class="header"></div>`)
      const Heating = new HeatDisplay(this.store);
      Header.append( $(`<h1>DJ's Home</h1>`), Heating.render() )
      HeaderWrapper.html(Header)

    const NavBar = new Nav(this.store);

    const Main = $(`<main></main>`)
    const Lights = new LightList(this.store);
    const TemperatureControl = new HeatingWidget(this.store);
    const Routes = [Lights,TemperatureControl]

    Main.html( 
      Routes[this.store.currentRoute].render()
    )

    this.$root.html( [HeaderWrapper, NavBar.render(), Main] )
  }
}