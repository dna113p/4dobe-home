import {getData} from './api'

//Centralize data storage
export default class Store {

  constructor() {
    this.data = {}
    this.routes = [
      { name: 'Lighting', class: 'far fa-lightbulb' },
      { name: 'Temperature', class: 'fas fa-thermometer-half' },
      { name: 'Settings', class: 'fas fa-cog' }
    ]
    this.currentRoute = 0;
    this.routeWrapper = null
    this.dependencies = {} 
  }

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
      console.log(this.dependencies['temp'])
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
