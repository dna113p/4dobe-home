import $ from 'jquery';

/*
* Base Component to be extended for custom components
*
* All custom Components should implement:
* Use the render function to render to $this.root and return the node so that other components can use it
* render() {
*   this.$root.html('render contents or children here using jquery')
*   return $this.root 
*}
*
* //Use the bindEvents function to bind events such as click handlers to your root node
* bindEvents() {}
*/
export default class  Component {

  constructor( template ) {
    this.$root = $(template);
    this.$root.attr('id',this.uid)

    if( this.bindEvents ) {
      this.bindEvents();
    }

  }


}