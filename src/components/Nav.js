import Component from './Component';
import $ from 'jquery';

class Nav extends Component{

  constructor( store ) {
    super('<div class="nav"></div>')
    this.store = store;
  }

  render() {
    const NavTop = $( `<div class="nav-top"></div>`)
    const NavBot = $( `<div class="nav-bot">${this.store.routes[this.store.currentRoute].name}</div>`) 

    const Items = this.store.routes.map( (item,index) => {
      item.SetRoute = () => this.store.SetRoute(index,this);
      const Button = new NavItem(item) ;
      return Button.render();
    })

    NavTop.html( Items );

    this.$root.html( [NavTop, NavBot])
    return this.$root
  }

}

class NavItem extends Component {
  constructor(props) {
    super(
      `<button class="nav-button">
        <i class="${props.class} fa-2x"></i>
      </button>`
    )
    this.SetRoute = props.SetRoute;
  }

  bindEvents() {
    this.$root.click( () => this.SetRoute() )
  }

  render() {
    return this.$root
  }
}

export default Nav;