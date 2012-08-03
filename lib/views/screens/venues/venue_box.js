
App.VenueProductSwipeView = Yn.SwipeView.extend( Yn.Btap, {

	width: 320,
  classNames: ['venue-products-swipe'],

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

	itemViewClass: Yn.UnboundView.extend({

    classNames: ['venue-product'],
    itemBinding: 'content.name'

  }),

  bTap: function() {

    var info = {
      venue: this.get('venue'),
      product: this.get('selected')
    };

    this.get('manager').send('selectVenueProduct', info);

  }

});

App.VenueBoxView = Em.View.extend({
  classNames: ['venue-box', 'box'],
  showLikes: false,
  geopositionIsOn: false,

  canShowGeoposition: Em.computed(function(){

    return this.get('showLikes') ? false : this.get('geopositionIsOn'); 

  }).property('showLikes', 'geopositionIsOn'),

  venue:null,
  products: null,
  selected: null,

  _productsChanged: Ember.observer(function() {

    var products = this.get('products');
    if (!!products && products.get('length') > 0 ) {
      this.set('selected', products.get('firstObject') );
    }

  }, 'products'),

  templateName: 'venue_box'

});
