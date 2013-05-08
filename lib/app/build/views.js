
// TODO: same with some controllers
// createWithMixins --> optimization
App.buildPrerenderViews = function() {

	//console.log('building prerender views');
	if ( !!App.PrerenderViews ) {

		App.PrerenderViews.forEach(function(item) {
			item.destroy();
			item = null;
		});

	}

	App.PrerenderViews = Em.A([]);

	var addToPrerenderViews = {
		init: function() {
			this._super();
			App.PrerenderViews.pushObject(this);
		}
	};

	// ------> navigatedViews

	App.scanInvitationScreenView = Yvi.ScanInvitationScreenView.createWithMixins(addToPrerenderViews, {
    invitationBinding: Em.Binding.oneWay('App.walletController.selected')

	});

	App.termsScreenView = Yvi.TermsScreenView.createWithMixins(addToPrerenderViews, {
	});

	App.invitationScreenView = Yvi.InvitationScreenView.createWithMixins(addToPrerenderViews, {
		loggedUserBinding: Em.Binding.oneWay('App.loginUserController.content'),
    inputValueBinding: 'App.inputsController.invitationComment',
    invitationBinding: Em.Binding.oneWay('App.walletController.selected')

	});

	App.friendsNearbyScreenView = App.FriendsNearbyScreenView.createWithMixins(addToPrerenderViews, {

	});

	App.editSettingsScreenView = Yvi.EditSettingsScreenView.createWithMixins(addToPrerenderViews, {
		userBinding: Em.Binding.oneWay('App.loginUserController.content'),
		citiesBinding: Em.Binding.oneWay('App.cityController.content')

	});

	App.aboutScreenView = Yvi.AboutScreenView.createWithMixins(addToPrerenderViews, {
  });
	App.legalScreenView = Yvi.LegalScreenView.createWithMixins(addToPrerenderViews, {
  });

	App.notificationScreenView = Yvi.NotificationScreenView.createWithMixins(addToPrerenderViews, {
    userBinding: Em.Binding.oneWay('App.inviteController.user'),
    facebookUserBinding: Em.Binding.oneWay('App.inviteController.facebookUser'),
    agendaUserBinding: Em.Binding.oneWay('App.inviteController.agendaUser')

	});

	// ------> modalViews
	App.mapScreenView = App.MapScreenView.createWithMixins(addToPrerenderViews, {
    inputValueBinding: 'App.inputsController.searchMap',
    isOnGeopositionEnablerBinding: Em.Binding.oneWay('App.buttonController.geopositionEnabler'),
    selectedCityBinding: Em.Binding.oneWay('App.cityController.selected'),
    citiesBinding: Em.Binding.oneWay('App.cityController.content'),
    isAsideRightBinding: Em.Binding.oneWay('App.asideController.mapCities')
	});

};
