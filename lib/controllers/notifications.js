
Yvi.NotificationsController = Em.ArrayController.extend({

  refresh: function() {

    var self = this,
        query = { limit: 100000 };

    var array = App.store.find(Yn.Notification, query);
    array.then(function() {
      var content = Em.A([]);
      array.forEach(function(item) {
        content.pushObject(item);
      });
      content.set('isLoaded', true);
      self.set('content', content);
    });

  }

});
