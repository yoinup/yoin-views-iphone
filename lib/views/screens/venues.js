
Yvi.VenuesCategoryButtonView = Em.View.extend( Yn.Btap, Yn.Icon, Yn.IsSelected, {
  iconBinding: Em.Binding.oneWay('content.icon'),
  action: 'selectCategory',
  actionContentBinding: Em.Binding.oneWay('content')

});


Yvi.VenuesGeoSwitchButton = Yn.LogoSwitchButtonView.extend({

  change: function( enabled ) {

    this.get('manager').send('changeGeopositionVisibility', enabled);

  }

});



Yvi.VenuesScreenView = Yvi.ScreenView.extend({

  elementId: 'venues_screen',
  screenContext: {},

	geopositionIsOn: null,
  currentTabView: null,

  categories: null,
  selectedCategory: null,

	categoryContent: null,
	categoryIsRefreshed: null,

	locationContent: null,
	locationIsRefreshed: null,

	likeContent: null, 
	likeIsRefreshed: null

});
