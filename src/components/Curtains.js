import Component from './Component';
import $ from 'jquery';

class Curtains extends Component{

  constructor( store ) {
    super('<div class="lighting-wrapper">"hi"</div>')
    this.store = store;
  }

  //Setup pices of Curtains List and render
  render() {
    const lights = this.store.data.lights
    const Curtains = lights.map( (item,index) => {
      item.key = index;
      item.SwitchCurtain = () => {this.store.SwitchLight(index,this)}
      const light = new CurtainItem(item) 
      return light.render();
    })

    this.$root.html( Curtains )
    return this.$root
  }

}

class CurtainItem extends Component {
  constructor(props) {
    super(
      `<div class="light-item ${props.switched}">
        <div class="${props.switched}">
          ${props.room}
        </div>
        <i class="far fa-sun ${props.switched}"></i>
      </div>`
    )
    this.SwitchCurtain = props.SwitchCurtain;
  }

  bindEvents() {
    this.$root.click( () => this.SwitchCurtain() )
  }

  render() {
    return this.$root
  }
}

export default Curtains;