Yvi.NotificationsTabState = Yvi.TabBaseState.extend({

  exit: function(sm) {

    var notifications = App.notificationsController.get('content');
    
    if ( !!notifications ) {
      notifications.forEach(function(item) {
        item.set('isNotified', true);
      });
      App.store.commit();
    }
    this._super();

  }


});
