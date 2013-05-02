
Yvi.NotificationsNotificationsState = Em.State.extend(Yvi.GoToMenu, {

  goToInvitation: function(sm, notification) {

    App.uiManager.initAsyncEvent();
    notification.set('isNotified', true);

    App.walletController.set('selected', notification.get('invitation') );
    sm.goToState('invitation');

  },

  refresh: function(sm) {
    App.walletController.refresh();
    App.notificationsController.refresh();
  }

});
