import Component from './Component';
import $ from 'jquery';

class HeatingWidget extends Component{

  constructor( store ) {
    super('<div class="heating-display"></div>')
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

  render() {
    const temp = this.store.data.temperature
    const IndicatorLayout = $('<div class="heating-indicator"></div>');
    //Temperature display elements
    const $Temp = $(
    `<div class="temp-display">
      ${temp.current }&deg;
    </div>`);

    //Heating status indicator
    const tempDiff = temp.target - temp.current;
    const $Indicator = 
      tempDiff > 0 ? $(`<i class="pulse fas fa-fire fa-2x"></i>`) :
      tempDiff < 0 ? $(`<i class="pulse fas fa-snowflake fa-2x"></i>`) : ''

    //Render Temp and Buttons to the root elemetn
    IndicatorLayout.html( $Indicator );
    this.$root.html( [IndicatorLayout, $Temp] );
    return this.$root
  }

}


export default HeatingWidget;