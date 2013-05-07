
Yvi.FriendsController = Em.ArrayController.extend({


	refresh: function() {
		
    var self = this,
        array = App.store.find(Yn.Friend, {});

    this.set('content', array);

  },

  loadFriends: function(friends) {

    var content = Em.A([]);

    if ( !!friends ) {

      friends.forEach(function(item) {
        content.pushObject(item);
      });

    }

    content.set('isLoaded', true);
    this.set('content', content);


  },

  newFriends: Em.computed(function() {

    var content = this.get('content');
    if ( !!content ) {
      return content.filter(function(item) {
        return item.get('isNew');
      });
    } else {
      return Em.A([]);
    }

  }).property('content.@each.isNew'),


  hasNewFriends: Em.computed(function() {

    var newFriends = this.get('newFriends');
    return ( !!newFriends ) ? newFriends.get('length') > 0 : false;

  }).property('newFriends.length')


});
