
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
		swipeThreshold: 30,
		initThreshold: 10
	},

  itemViewClass: Em.View.extend( Yn.IsLoading, {
    tagName: 'img',
    attributeBindings: ['src'],
    classNames: ['venue-product'],
    srcBinding: 'content.picture'
  }),

  init: function() {

    this._super(); 

    // TODO: via MAP
    var self = this;
    this.getPath('eventManager.gestures').forEach( function(item) {

      if ( item.name === 'swipe' ) { 
        self.swipeGesture = item;
      }
    });

  },

  action: 'selectVenueProduct',
  actionContent: Em.computed(function() {

    return { venue: this.get('venue'),
             product: this.get('selected') };

  }).property('venue', 'selected'),

  touchMove: function(evt) {

    // TODO: update sproutcore-touch
    // pass evt to gestureMethods
    //https://github.com/emberjs-addons/sproutcore-touch/issues/13
    var state = this.swipeGesture.get('state');
    if ( state === Em.Gesture.BEGAN || state === Em.Gesture.CHANGED ) {
      evt.preventDefault();
    }

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

  sixPeople: Em.computed(function() {
  
    return this.getPath('venue.nearUsers').slice(0, 6);

  }).property('venue.nearUsers'),

  templateName: 'venue_box'

});
