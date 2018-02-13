import Component from './Component';
import $ from 'jquery';

class HeatingWidget extends Component{

  constructor( store ) {
    super('<div class="heating-widget-wrapper"></div>')
    this.store = store;
    this.store.registerDep('temp',this)
    this.state = {
      adjustTemp: false
    }
  }

  bindEvents() {
    this.$root.mouseenter( e => {
      if( !this.state.adjustTemp ) {
        this.state.adjustTemp = true;
        this.render();
      }
    })
    this.$root.mouseleave( e => {
      if( this.state.adjustTemp ) {
        this.state.adjustTemp = false;
        this.render();
      }
    })
  }

  //Setup pices of HeaingWidget and render
  render() {
    const temp = this.store.data.temperature
    const TempLayout = $('<div class="heating-widget"></div>');

    //Initialize child components
    const Up = new Button({direction:'up', adjustHeat: () => this.store.SetTemp(1)});
    const Down = new Button({direction:'down', adjustHeat: () => this.store.SetTemp(-1)});

    //Temperature control/display elements
    const $Up = Up.render();
    const $Down = Down.render();
    const $Temp = $(
    `<div class="temp-display">
      ${temp.target}&deg;
    </div>`);

    //Heating status indicator
    const tempDiff = temp.target - temp.current;

    //Render Temp and Buttons to the root elemetn
    TempLayout.html( [$Up, $Temp, $Down] ) ;
    this.$root.html( [$('<div>Set desired temp:</div>'),TempLayout] );
    return this.$root
  }

}

class Button extends Component {
  constructor(props) {
    super(
      `<button class="temp-button">
        <i class="fas fa-angle-${props.direction} fa-3x">
      </button>`
    )
    this.adjustHeat = props.adjustHeat;
  }
  bindEvents() {
    this.$root.click( e => {
      this.adjustHeat()
    })
  }
  render() {
    return this.$root
  }
}

export default HeatingWidget;