Yvi.WalletWalletState = Em.State.extend(Yvi.GoToMenu, {

  goToInvitation: function(sm, invitation) {

    App.uiManager.initAsyncEvent();
    App.walletController.set('selected', invitation);
    sm.goToState('invitation');

  },

  tabFire: function(sm, option) {

    App.tabController.set('wallet', option);

  },

  refresh: function(sm) {

    var controller = (App.tabController.get('wallet') === Yvi.WalletOption.received)  ? App.walletController : App.sentWalletController;
    controller.refresh();

  },

  changeInbox: function(sm) {
    
    App.uiManager.initAsyncEvent();
    var value = App.tabController.get('walletIsInbox');
    App.tabController.set('walletIsInbox', !value);
    Em.run.next(function() {
      // cause: [CALayer opacity]: message sent to deallocated instance
      App.uiManager.endAsyncEvent();
    });

  }

});
