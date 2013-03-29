Yvi.WalletWalletState = Em.State.extend(Yvi.GoToMenu, {

  goToInvitation: function(sm, invitation) {

    App.uiManager.initAsyncEvent();
    App.walletController.set('selected', invitation);
    sm.goToState('invitation');

  },

	goToMap: function(sm) {

    var invitations = App.walletController.get('content');

    // TODO: apply check at the bottom
    if( !!invitations && 
         invitations.get('isLoaded') && 
         App.walletController.get('isVenuesLoaded') ) {

      App.uiManager.initAsyncEvent();
      App.mapScreenView.setProperties({ '_withHeaderAction': false,
                                        'venues': invitations.mapProperty('venue'), 
                                        'manager': sm });
      App.appendToRoot(App.mapScreenView);
      sm.goToState('map');
    }

	}

});
