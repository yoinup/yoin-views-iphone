
Yvi.NotificationsNotificationsState = Em.State.extend({

  enter: function(sm) {

    var view = Em.View.views['notifications-modal'];

    if ( !view.hasInitContent ) {
      view.hasInitContent = true;
      view.one('transitionShow', function() {
        App.contentController.set('notifications', true);
      });
    }

    this._super();


  },

  _cleanNotifications: function() {
    var notifications = App.notificationsController.get('content');
    if ( !!notifications ) {
      notifications.forEach(function(item) {
        item.set('isNotified', true);
      });
      App.store.commit();
    }
  },

  _changeModal: function() {
    var closed = App.modalController.get('notificationsHidden');
    App.modalController.set('notificationsHidden', !closed);
  },

  close: function(sm) {
    App.uiManager.initAsyncEvent();
    this._changeModal();
    this._cleanNotifications();
    sm.goToState('closed');
  },


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
