
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
      var mustCommit = false;
      notifications.forEach(function(item) {

        if ( !item.get('isNotified') ) {
          mustCommit = true;
          item.set('isNotified', true);
        }

      });

      if ( mustCommit ) {
        App.store.commit();
      }
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


  goToNotification: function(sm, notification) {

    notification.set('isNotified', true);

    var invitation = notification.get('invitation');

    if (!!invitation) {
      App.uiManager.initAsyncEvent();
      App.walletController.set('selected', invitation );
      sm.goToState('invitation');
    }

  },

  refresh: function(sm) {
    App.refreshUserData();
  }

});
