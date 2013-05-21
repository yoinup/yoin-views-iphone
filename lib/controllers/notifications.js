
Yvi.NotificationsController = Em.ArrayController.extend({

  isPendingCounter: Em.computed(function() {
    
    var content = this.get('content');
    if (!content) {return 0;}

    return content.filter(function(item) {
      return !item.get('isNotified');
    }).get('length');

  }).property('content.@each.isNotified'),

  isFetchingContent: Em.computed(function() {

    var fetchContent = this.get('fetchContent'); 
    return ( !!fetchContent ) ? fetchContent.get('isLoaded') === false : false;

  }).property('fetchContent.isLoaded'),

  refresh: function() {

    if ( !this.get('isFetchingContent') ) {

      var self = this,
          query = { order_by: '-created', 
                    limit: 15 };

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

  }

});
