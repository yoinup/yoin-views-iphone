
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

  action: 'selectVenueProduct',
  actionContent: Em.computed(function() {

    return { venue: this.get('venue'),
             product: this.get('selected') };

  }).property('venue', 'selected'),

  swipeStart: function(gesture, evt) {
    evt.preventDefault();
  },

  swipeChange: function(gesture, evt) {
    evt.preventDefault();
  },

  swipeEnd: function(gesture, evt) {
    this._super(gesture, evt);
    evt.preventDefault();
  }


});

Yvi.VenueBoxView = Em.View.extend({
  classNames: ['venue-box', 'box'],

  venue:null,
  products: null,
  selected: null,

  loggedUser: null,

  isGeopositionOn: false,


  _productsChanged: Ember.observer(function() {

    var products = this.get('products');
    if ( !this.get('selected') && !!products && products.get('length') > 0 ) {
      this.set('selected', products.get('firstObject') );
    }

  }, 'products.@each'),


  sixPeople: Em.computed(function() {
  
    var result = Em.A([]),
        nearUsers = this.getPath('venue.nearUsers'),
        nears = 0,
        index = 0,
        loggedUser = this.get('loggedUser'),
        length = nearUsers.get('length');

    while ( (index < length) && (nears < 6) ) {

      var item = nearUsers.objectAt(index);
      if ( item !== loggedUser ) {
        result.pushObject(item);
        nears++;
      }
      index++;

    }
    
    return result;

  }).property('venue.nearUsers', 'loggedUser'),

  templateName: 'venue_box'

});
