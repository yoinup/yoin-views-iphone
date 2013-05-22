
Yvi.NotificationsController = Em.ArrayController.extend({

  isPendingCounter: Em.computed(function() {
    
    var content = this.get('content');
    if (!content) {return 0;}

    return content.filter(function(item) {
      return !item.get('isNotified');
    }).get('length');

  }).property('content.@each.isNotified'),

  /* TODO
    - array.then ( function error )
      -- implement isFetchingContent and
      -- clean up either in success or error method
    - if controller is fetching, the refresh method should 
     be executed
  */
  refresh: function() {


    var self = this,
        query = { order_by: '-created', 
                  limit: 15 };

    this.set('content', null);

    var array = App.store.find(Yn.Notification, query);
    this.set('fetchContent', array);
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
