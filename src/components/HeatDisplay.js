import Component from './Component';
import $ from 'jquery';

class HeatingWidget extends Component{

  constructor( store ) {
    super('<div class="heating-display"></div>')
    this.store = store;
    store.registerDep('temp',this)
  }

  render() {
    const temp = this.store.data.temperature
    const IndicatorLayout = $('<div class="heating-indicator"></div>');

    //Temperature display element
    const $Temp = $(`<div class="temp-display">${temp.current }&deg;</div>`);

    //Heating status indicator
    const tempDiff = temp.target - temp.current;
    const $Indicator = 
      tempDiff > 0 ? $(`<i class="pulse fas fa-fire"></i>`) :
      tempDiff < 0 ? $(`<i class="pulse fas fa-snowflake"></i>`) : ''

    IndicatorLayout.html( $Indicator );
    this.$root.html( [IndicatorLayout, $Temp] );
    return this.$root
  }

}


export default HeatingWidget;