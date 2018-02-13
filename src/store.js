import {getData} from './api'

//Centralize data storage
export default class Store {
  constructor() {
    this.data = {}
  }
  async loadData() {
    this.data = await getData()
  }

  //Use store methods as actions to update store values
  SetTemp(val, component) {
    if ( this.data ) {
      this.data.temperature.target += val
      component.render();
      this.simulateTemperature(component);
    }
  }

  SwitchLight(index, component) {
    if( this.data ) {
      const light = this.data.lights[index]
      this.data.lights[index].switched = light.switched === "on" ? "off" : "on";
      component.render();
    }
  }



  //fake temperature adjustment
  simulateTemperature(component){
    const temp = this.data.temperature

    if (temp.current === temp.target) return;

    if (temp.current > temp.target) setTimeout( () => {
      this.data.temperature.current--;
      component.render();
      this.simulateTemperature(component);
    },3000);

    if (temp.current < temp.target) setTimeout( () => {
      this.data.temperature.current++;
      component.render();
      this.simulateTemperature(component);
    },3000);

  }
  
}
