
Yvi.VenueBoxProductSwipeView = Yn.SwipeView.extend( Yn.Btap, {

	width: 320,
  classNames: ['venue-box-products-swipe'],

  venue: null,
  content:null,
  selected:null,

	swipeOptions: {
		direction: Em.OneGestureDirection.Left | Em.OneGestureDirection.Right,
		cancelPeriod: 100,
    simultaneously: true,
		swipeThreshold: 20,
		initThreshold: 10
	},

  itemViewClass: Em.View.extend( Yn.IsLoading, {
    tagName: 'img',
    attributeBindings: ['src'],
    classNames: ['venue-product'],
    srcBinding: 'content.picture'
  }),

  action: 'selectVenueProduct',
  actionContent: Em.computed(function() {

    return { venue: this.get('venue'),
             product: this.get('selected') };

  }).property('venue', 'selected')


});

Yvi.VenueBoxView = Em.View.extend({
  classNames: ['venue-box', 'box'],
  showLikes: false,

  canShowGeoposition: Em.computed(function(){

    //return this.get('showLikes') ? false : this.get('geopositionIsOn'); 
    return this.get('showLikes') === true ? false : true; 

  }).property('showLikes', 'geopositionIsOn'),


  venue:null,
  products: null,
  selected: null,

  loggedUser: null,


  _productsChanged: Ember.observer(function() {


    var products = this.get('products');

		//console.log( '......products changed');
		//console.log( products );

    if ( !this.get('selected') && !!products && products.get('length') > 0 ) {

			//console.log( 'assigning products ');
      this.set('selected', products.get('firstObject') );
    }

  }, 'products.@each'),


  sixPeople: Em.computed(function() {
  
    var result = Em.A([]),
        nearUsers = this.getPath('venue.nearUsers'),
        nears = 0,
        index = 0,
        length = nearUsers.get('length');

    console.log( this.get('loggedUser') );

    while ( (index < length) && (nears < 6) ) {

      var item = nearUsers.objectAt(index);
      if ( item !== this.get('loggedUser') ) {
        result.pushObject(item);
        nears++;
      }
      index++;

    }
    
    return result;

  }).property('venue.nearUsers'),

  templateName: 'venue_box'

});
