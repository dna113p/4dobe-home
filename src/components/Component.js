import $ from 'jquery';

export default class  Component {

  constructor( template ) {
    this.$root = $(template);
    this.$root.attr('id',this.uid)

    if( this.bindEvents ) {
      this.bindEvents();
    }

  }


}