
Yvi.WalletScanInvitationState = Yvi.BaseNavigatedState.extend({

  close: function(sm){

    App.uiManager.initAsyncEvent();
    sm.get('navigationView').popToRootView( function() {
      App.uiManager.endAsyncEvent();
      sm.goToState('wallet');
    });

  }

});
