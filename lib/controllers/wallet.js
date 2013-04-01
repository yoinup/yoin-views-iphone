
Yvi.WalletController = Em.ArrayController.extend({
	selected: null,
  loginUserController: null,

  refresh: function() {
    var userId = this.loginUserController.get('content.id'),
        query = { to_user: userId, 
                  consumed: false, 
                  processing: false, 
                  order_by: '-created', 
                  limit: 100000 };
    
    var self = this;
    var array = App.store.find(Yn.Invitation, query);
    array.then(function() {
      // the result of a query is inmmutable
      var content = Em.A([]);
      array.forEach(function(item) {
        content.pushObject(item);
      });
      self.set('content', content);
      content.set('isLoaded', true);
    });
  },

  removeObject: function(item) {
    this.get('content').removeObject(item);
  },


  isVenuesLoaded: Em.computed(function() {

    var content = this.get('content');
    if ( !content || !content.get('isLoaded') ) return false;

    return content.every(function(invitation) {
      return invitation.get('venue.isLoaded');
    });

  }).property('content.@each.venue.isLoaded')

});