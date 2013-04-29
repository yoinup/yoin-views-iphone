Yvi.BaseWalletController = Em.ArrayController.extend({

  loginUserController: null,

  refresh: function() {

    var userId = this.loginUserController.get('content.id'),
        query = this.getQuery();
    /*
    // to load spinner
    if ( !!this.get('content') ) {
      this.set('content.isLoaded', false);
    }
    */

    // the result of a query is inmmutable
    var self = this;
    var array = App.store.find(Yn.Invitation, query);
    array.then(function() {
      var content = Em.A([]);
      array.forEach(function(item) {
        content.pushObject(item);
      });
      content.set('isLoaded', true);
      self.set('content', content);
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

Yvi.WalletController = Yvi.BaseWalletController.extend({

	selected: null,

  getQuery: function() {

    return { to_user: this.loginUserController.get('content.id'), 
              consumed: false, 
              rejected: false, 
              order_by: '-created', 
              limit: 100000 };

  }

});

Yvi.SentWalletController = Yvi.BaseWalletController.extend({

  getQuery: function() {

    return { from_user: this.loginUserController.get('content.id'), 
              consumed: false, 
              rejected: false, 
              order_by: '-created', 
              limit: 100000 };
  }

});
