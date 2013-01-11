
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

  action: 'selectProduct',
  actionContent: Em.computed(function() {

    return this.get('selected');

  }).property('selected')

});



Yvi.VenueScreenView = Yvi.ScreenView.extend({
	elementId: 'venue_screen',

	classNameBindings: ['isMap'],

	isMap: false,

	venue: null,
	selected: null,
	products: null,

	loggedUser: null,


	otherProducts: Em.computed(function() {

		var selected = this.get('selected'),
				products = this.get('products'),
				result;

		if (!!selected && !!products && products.get('length') > 1 )  {

			result = products.filter(function(item) {
				return item !==selected;
			});

		}
	
		return result;

	}).property('products.@each', 'selected'),

	didInsertElement: function() {

		this._super();
		this.containerMapView = Em.View.views['venue-map'];

	},


	sixPeople: Em.computed(function() {

		var result = Em.A([]),
				nearUsers = this.get('venue.nearUsers'),
				nears = 0,
				index = 0,
				length = nearUsers.get('length');

		while ( (index < length) && (nears < 6) ) {

			var item = nearUsers.objectAt(index);
			if ( item !== this.get('loggedUser') ) {
				result.pushObject(item);
				nears++;
			}
			index++;

		}
		
		return result;

	}).property('venue.nearUsers', 'loggedUser')

});
