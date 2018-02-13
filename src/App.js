import $ from 'jquery';
import api from './api';
import Store from './store';

import HeatingWidget from './components/HeatingWidget';
import LightList from './components/Lights';

export default class App {
  constructor( root ){
    this.$root = $(root);
    this.store = new Store;
  }

  //Call this to render component
  render() {

    const Header = $(`<header class="header"></header>`)
      const Heating = new HeatingWidget(this.store);
      Header.append( $(`<h1>DJ's Smart Home Hub</h1>`), Heating.render() )

    const Main = $(`<main></main>`)
      const Lights = new LightList(this.store);
      Main.html( Lights.render() )


    this.$root.html( [Header, Main] )
  }
}