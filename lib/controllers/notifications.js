
Yvi.NotificationsController = Em.ArrayController.extend({

  isPendingCounter: Em.computed(function() {
    
    var content = this.get('content');
    if (!content) {return 0;}

    return content.filter(function(item) {
      return !item.get('isNotified');
    }).get('length');

  }).property('content.@each.isNotified'),

  refresh: function() {

    var self = this,
        query = { order_by: '-created', 
                  limit: 15 };

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
