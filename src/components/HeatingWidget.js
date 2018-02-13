import Component from './Component';
import $ from 'jquery';

class HeatingWidget extends Component{

  constructor( store ) {
    super('<div class="heating-widget-wrapper"></div>')
    this.store = store;
    this.store.registerDep('temp',this)
  }

  render() {
    const temp = this.store.data.temperature
    const TempLayout = $('<div class="heating-widget"></div>');

    //Initialize buttons for temperature adjustment
    const Up = new Button({direction:'up', adjustHeat: () => this.store.SetTemp(1)});
    const Down = new Button({direction:'down', adjustHeat: () => this.store.SetTemp(-1)});

    //Temperature control/display elements
    const $Up = Up.render();
    const $Down = Down.render();
    const $Temp = $(`<div class="temp-display">${temp.target}&deg;</div>`);

    //Heating status indicator
    const tempDiff = temp.target - temp.current;

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