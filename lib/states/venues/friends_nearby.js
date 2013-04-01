
Yvi.VenuesFriendsNearbyState = Yvi.BaseNavigatedState.extend({

	invite: function(sm, context) {

    App.uiManager.initAsyncEvent();


		App.inviteController.set('isNearby', true);
		App.inviteController.set('user', context);
    App.checkoutManager.send('goToInvite');

	}

});
