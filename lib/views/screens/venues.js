

Yvi.VenuesScreenView = Yvi.ScreenView.extend({

  elementId: 'venues_screen',
  screenContext: {},

	content: null,
	isRefreshed: null,

  loggedUser: null,

  friends: null,

  isGeopositionOn: false,

	isContentLoaded: Em.computed(function() {

		return !!this.get('content');

	}).property('content')

});
