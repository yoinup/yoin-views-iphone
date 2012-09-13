
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

  bTap: function() {

    var info = {
      venue: this.get('venue'),
      product: this.get('selected')
    };

    this.get('manager').send('selectVenueProduct', info);

  }

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

  _productsChanged: Ember.observer(function() {


    var products = this.get('products');

		//console.log( '......products changed');
		//console.log( products );

    if ( !this.get('selected') && !!products && products.get('length') > 0 ) {

			//console.log( 'assigning products ');
      this.set('selected', products.get('firstObject') );
    }

  }, 'products.@each'),

  six_people: Em.computed(function() {
  
    return this.getPath('venue.nearUsers').slice(0, 6);

  }).property('venue.nearUsers'),

  templateName: 'venue_box'

});
