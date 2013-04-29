
Yvi.WalletController = Em.Object.extend({

  selected: null,

  inboxReceivedController: null,
  inboxSentController: null,
  archivedReceivedController: null,
  archivedSentController: null,

  refresh: function() {

    var user = this.loginUserController.get('content'),
        query = { order_by: '-created', 
                  limit: 100000 };

    // the result of a query is inmmutable
    var self = this,
        c;
    var array = App.store.find(Yn.Invitation, query);
    array.then(function() {

      self.inboxReceivedController.clear();
      self.inboxSentController.clear();
      self.archivedReceivedController.clear();
      self.archivedSentController.clear();

      array.forEach(function(item) {

        if ( item.get('consumed') || item.get('rejected')  ) {
          c = ( user === item.get('toUser') ) ?  self.archivedReceivedController : self.archivedSentController;
        } else {
          c = ( user === item.get('toUser') ) ?  self.inboxReceivedController : self.inboxSentController;
        }

        c.get('content').pushObject(item);
      });
    });

  }

});

Yvi.BaseWalletController = Em.ArrayController.extend({

  content: null,
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
