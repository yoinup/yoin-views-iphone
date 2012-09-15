
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
	products: null,


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


	six_people: Em.computed(function() {
	
		return this.getPath('venue.nearUsers').slice(0, 6);

	}).property('venue.nearUsers')

});
