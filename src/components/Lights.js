import Component from './Component';
import $ from 'jquery';

class Lights extends Component{

  constructor( store ) {
    super('<div class="lighting-wrapper">"hi"</div>')
    this.store = store;
  }

  //Setup pices of Lights List and render
  render() {
    const lights = this.store.data.lights
    const LightsList = lights.map( (item,index) => {
      item.key = index;
      item.SwitchLight = () => {this.store.SwitchLight(index,this)}
      const light = new LightItem(item) 
      return light.render();
    })

    this.$root.html( LightsList )
    return this.$root
  }

}

class LightItem extends Component {
  constructor(props) {
    super(
      `<div class="light-item ${props.switched}">
        <div class="${props.switched}>
          <i class="far fa-lightbulb ${props.switched}"></i>
          ${props.room}
        </div>
        <i class="fas fa-power-off ${props.switched}"></i>
      </div>`
    )
    this.SwitchLight = props.SwitchLight;
  }

  bindEvents() {
    this.$root.click( () => this.SwitchLight() )
  }

  render() {
    return this.$root
  }
}

export default Lights;