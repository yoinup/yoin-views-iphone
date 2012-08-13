
Yvi.VenueProductSwipeView = Yn.SwipeView.extend( Yn.Btap, {

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

	itemViewClass: Em.View.extend( Yn.IsLoading, {
    tagName: 'img',
    attributeBindings: ['src'],
    classNames: ['venue-product'],
    srcBinding: 'content.picture'
  }),

  bTap: function() {

    this.get('manager').send('selectProduct', this.get('selected') );

  }

});



Yvi.VenueScreenView = Yvi.ScreenView.extend({
  elementId: 'venue_screen',

  classNameBindings: ['isMap'],

  isMap: false,

  venue: null,
  selected: null,
  people: null,

  didInsertElement: function() {

    this._super();
    this.containerMapView = Em.View.views['venue-map'];

  }

});
