
Yvi.WalletController = Em.Object.extend({

  selected: null,

  inboxInvitationsController: null,
  archivedInvitationsController: null,

  refresh: function() {

    var user = this.loginUserController.get('content'),
        query = { to_user: user.get('id'), 
                  order_by: '-created', 
                  limit: 100000 };

    // the result of a query is inmmutable
    var self = this,
        c;
    var array = App.store.find(Yn.Invitation, query);
    //  TODO: does not execute if empty array?
    array.then(function() {

      self.inboxInvitationsController.clear();
      self.archivedInvitationsController.clear();

      array.forEach(function(item) {

        if ( item.get('consumed') || item.get('rejected')  ) {
          c = self.archivedInvitationsController;
        } else {
          c = self.inboxInvitationsController;
        }

        c.get('content').pushObject(item);
      });
    });

  }

});

Yvi.BaseWalletController = Em.ArrayController.extend({

  content: Em.A([]),
  sortedContent: Em.computed(function() {
    var content = this.get('content');
    if ( !content ) return;

    return content.sort( function(a,b){
      return b.get("created") - a.get("created");
    });
  }).property('content.@each'),

  clear: function() {
    this.set('content', Em.A([]) );
  }

});

Yvi.InboxInvitationsController = Yvi.BaseWalletController.extend({

  pendingCounter: Em.computed(function() {

    var content = this.get('content');
    if ( !content ) return;

    return content.filter( function(item){
      return item.get("isPending");
    }).get('length');

  }).property('content.@each.isPending')

});
