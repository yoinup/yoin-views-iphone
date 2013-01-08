
Yvi.VenueNearPlusButtonView = Em.View.extend(Yn.Btap, {

  people: null,
  venue: null,

  bTap: function() {
    var venue = this.get('venue'), 
        people = this.get('people'),
        context = {venue: venue, people: people};

    this.triggerEvent(this.get('action'), context);
  }

});

Yvi.VenueNearUserSquareImageView = Yn.SquareImageView.extend(Yn.Btap, {

  content: null,
  venue: null,

  venueBox: null,

  didInsertElement: function() {
    this._super();
    this.venueBox = this.nearestOfType(Yvi.VenueBoxView);
  },

  bTap: function() {

    var product = this.venueBox.get('selected'),
        venue = this.get('venue'),
        user = this.get('content'),
        context = {user: user, product: product, venue: venue};

    this.triggerEvent('inviteToNearFriend',  context);

  }

});

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
  classNameBindings: ['hasPeople'],
  classNames: ['venue-box', 'box'],

  venue:null,
  products: null,
  selected: null,

  loggedUser: null,

  isGeopositionOn: false,

  init: function() {
    this._super();
    // observers are not fired at startup
    this._productsChanged();

  },


  _productsChanged: Ember.observer(function() {

    var products = this.get('products');
    if ( !this.get('selected') && !!products && products.get('length') > 0 ) {
      this.set('selected', products.get('firstObject') );
    }

  }, 'products.@each'),

  // remove the current loggedUser if present
  people: Em.computed(function() {
    var result = Em.A([]),
        index = 0,
        nearUsers = this.get('venue.nearUsers'),
        loggedUser = this.get('loggedUser'),
        length = nearUsers.get('length');

    while ( index < length  ) {
      var item = nearUsers.objectAt(index);
      if ( item !== loggedUser ) {
        result.pushObject(item);
      }
      index++;
    }
    return result;

  }).property('venue.nearUsers', 'loggedUser'),


  fivePeople: Em.computed(function() {

    var people = this.get('people'),
        result;

    if ( !!people ) {
      result = people.slice(0,5);
    }

    return result;

  }).property('people'),

  higherThanFivePeople: Em.computed(function() {

    var length = this.get('people.length');
    return (!!length) ? length > 5 : false;

  }).property('people'),

  hasPeople: Em.computed(function() {

    var length = this.get('people.length');
    return (!!length) ? length > 0 : false;

  }).property('people'),

  templateName: 'venue_box'

});
