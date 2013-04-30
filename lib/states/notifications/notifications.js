
Yvi.NotificationsNotificationsState = Em.State.extend(Yvi.GoToMenu, {

  goToInvitation: function(sm, invitation) {

    App.uiManager.initAsyncEvent();
    App.walletController.set('selected', invitation);
    sm.goToState('invitation');

  },

  clear: function(sm) {

  }

});
