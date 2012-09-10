
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

	didInsertElement: function() {

		this._super();
		this.containerMapView = Em.View.views['venue-map'];

	},


	six_people: Em.computed(function() {
	
		return this.getPath('venue.nearUsers').slice(0, 6);

	}).property('venue.nearUsers')

});


/*

	isOneProduct: Em.computed(function() {

		return (this.get('products').length === 1);

	}).property('products'),

	firstProduct: Em.computed(function() {

		return this.get('products').get('firstObject');

	}).property('products'),


	productsWithoutLastOne: Em.computed(function() {

		var result = Em.A([]),
				products = this.get('products'),
				length = products.get('length'); 
		
		products.forEach( function (item, index) {
			
			if ( index !== length-1 ) {
				result.pushObject(item);
			}
			
		});
		
		return result;

	}).property('products'),


	lastProduct: Em.computed(function() {

		return this.get('products').get('lastObject');

	}).property('products'),

*/




//Code used in handlebars with products (all and last one)

/*


{{#if isOneProduct }}

	{{#with firstProduct}}
		<div id="vpr-element" class="two-column-table last">
			<div class="vpr-name text is-big is-font-black left-column">
				{{name}}
			</div>
			<div class="price-label right-column"> 
				{{price}} {{I18n currency_symbol}}
			</div>
		</div>
	{{/with}}

{{else }}

	{{#each productsWithoutLastOne}}
		<div id="vpr-element" class="two-column-table no-last">
			<div class="vpr-name text is-big is-font-black left-column">
				{{name}}
			</div>
			<div class="price-label right-column"> 
				{{price}} {{I18n currency_symbol}}
			</div>
		</div>
	{{/each}}

	{{#each lastProduct}}
		<div id="vpr-element" class="two-column-table last">
			<div class="vpr-name text is-big is-font-black left-column">
				{{name}}
			</div>
			<div class="price-label right-column"> 
				{{price}} {{I18n currency_symbol}}
			</div>
		</div>
	{{/each}}

{{/if}}

*/