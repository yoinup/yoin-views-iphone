
Yvi.NotificationsClosedState = Em.State.extend({

  exit: function() {
    var closed = App.modalController.get('notificationsHidden');
    App.modalController.set('notificationsHidden', !closed);
    this._super();
  }


});
