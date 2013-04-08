
Yvi.VenuesVenuesState = Em.State.extend( Yvi.GoToMenu, Yvi.InviteProductEvent, {

	enter: function(sm) {
		this._super(sm);
		if ( !App.venuesController.get('content') ) {
			App.venuesController.refresh();
		}
	},

	refresh: function(sm) {
		App.venuesController.refresh();
	},

  chooseUser: function(sm, user) {
		App.inviteController.set('user', user);
  },

  changeUser: function(sm) {
    this._goToChooseUser(sm);
  },

	addFriend: function(sm) {
    this._goToChooseUser(sm);
	},

  _goToChooseUser: function(sm) {

    App.uiManager.initAsyncEvent();
    App.chooseUserManager.goToState('friends');

  },

	goToCategories: function(sm) {
    App.uiManager.initAsyncEvent();
    App.modalController.set('categoriesHidden', false);
		sm.goToState('categories');
	},

	goToMap: function(sm) {

    var venues = App.mapVenuesController.get('content');
    if( !!venues && venues.get('isLoaded') ) {

      App.uiManager.initAsyncEvent();
      var prop = { 'venues': venues, 
                   'showVenue': false, 
                   'showCities': true, 
                   'manager': sm };

      App.mapScreenView.setProperties(prop);
      App.appendToRoot(App.mapScreenView);
      sm.goToState('map');
    }

	},


	selectVenueProduct: function(sm, context) {
		
    App.uiManager.initAsyncEvent();
		App.inviteController.setProduct(context.product);
		App.inviteController.set('venue', context.venue);

    App.checkoutManager.send('goToInvite');
	},

  inviteToNearFriend: function(sm, context) {

    App.uiManager.initAsyncEvent();

		App.inviteController.setProduct(context.product);
		App.inviteController.set('user', context.user);
		App.inviteController.set('venue', context.venue);

    App.checkoutManager.send('goToInvite');

	},

	goToFriendsNearby: function(sm, venue) {

    App.uiManager.initAsyncEvent();

		App.friendsNearbyController.set('venue', venue);
		App.friendsNearbyController.set('people', venue.get('nearUsers') );
    sm.goToState('friendsNearby');
		
	}

});
