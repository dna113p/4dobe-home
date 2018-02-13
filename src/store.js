import {getData} from './api'

//Centralized place to store the state of the application
export default class Store {

  constructor() {
    this.data = {}
    this.dependencies = {} 

    //Setup simple routing with the store
    this.routes = [
      { name: 'Lighting', class: 'far fa-lightbulb' },
      { name: 'Temperature', class: 'fas fa-thermometer-half' },
      { name: 'Settings', class: 'fas fa-cog' }
    ]
    this.currentRoute = 0;
    this.routeWrapper = null
  }

  //Asynchronously load data
  async loadData() {
    this.data = await getData()
  }

  //Register a component with the store in dependencies so that it can
  //be updated by an action
  registerDep(key, component){
    if ( this.dependencies[key] === undefined ) this.dependencies[key] = [];
    this.dependencies[key].push(component);
    console.log(this.dependencies)
  }

  /*
  *
  * Actions
  * Use methods on the store as Actions that update the store
  * and render dependents
  * 
  */
  SetTemp(val) {
    if ( this.data ) {
      this.data.temperature.target += val
      this.dependencies['temp'].forEach(element => {
        element.render();
      });
    }
  }

  SwitchLight(index, component) {
    if( this.data ) {
      const light = this.data.lights[index]
      this.data.lights[index].switched = light.switched === "on" ? "off" : "on";
      component.render();
    }
  }
  
  SetRoute(index, component) {
    if( this.data ) {
      this.currentRoute = index;
      this.routeWrapper.render();
    }
  }
  
}
