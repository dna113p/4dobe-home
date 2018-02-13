import Component from './Component';
import $ from 'jquery';

class HeatingWidget extends Component{

  constructor( store ) {
    super('<div class="heating-widget-wrapper"></div>')
    this.store = store;
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
    //Wrapper elements
    const IndicatorLayout = $('<div class="heating-indicator"></div>');
    const TempLayout = $('<div class="heating-widget"></div>');

    //Initialize child components
    const Up = new Button({direction:'up', adjustHeat: () => this.store.SetTemp(1,this)});
    const Down = new Button({direction:'down', adjustHeat: () => this.store.SetTemp(-1,this)});

    //Temperature control/display elements
    const $Label = $('<span>Current Temperature</span>')
    const $Up = Up.render();
    const $Down = Down.render();
    const $Temp = $(
    `<div class="temp-display">
      ${this.state.adjustTemp ? temp.target : temp.current }&deg;
    </div>`);

    //Heating status indicator
    const tempDiff = temp.target - temp.current;
    const $Indicator = 
      tempDiff > 0 ? $(`<i class="pulse fas fa-fire fa-2x"></i>`) :
      tempDiff < 0 ? $(`<i class="pulse fas fa-snowflake fa-2x"></i>`) : ''

    //Render Temp and Buttons to the root elemetn
    IndicatorLayout.html( $Indicator );
    TempLayout.html( this.state.adjustTemp ? [$Up, $Temp, $Down] : [$Label, $Temp] ) ;
    this.$root.html( [IndicatorLayout, TempLayout] );
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