import $ from 'jquery';
import api from './api';
import Store from './store';

import HeatDisplay from './components/HeatDisplay';
import Nav from './components/Nav';
import HeatingWidget from './components/HeatingWidget';
import LightList from './components/Lights';

export default class App {
  //Custom App component for the base of our application
  //constructed with a root node to render to
  constructor( root ){
    this.$root = $(root);
    this.store = new Store;
    this.store.routeWrapper = this;
  }

  //Call this to render component
  //Setup layout for app
  render() {

    //Header Section
    const Header = $(`<div class="header"></div>`)
    const Heating = new HeatDisplay(this.store);
    Header.html( [$(`<h1>DJ's Smart Home</h1>`), Heating.render()] )
    const HeaderWrapper = $(`<header></header>`)
    HeaderWrapper.html(Header)

    //Main Content Section
    const Main = $(`<main></main>`)
    const NavBar = new Nav(this.store);
    const Lights = new LightList(this.store);
    const TemperatureControl = new HeatingWidget(this.store);

    const Routes = [Lights,TemperatureControl]
    Main.html(Routes[this.store.currentRoute].render())

    //Finally render all children to the root element (document.body)
    this.$root.html([HeaderWrapper, NavBar.render(), Main])
  }
}