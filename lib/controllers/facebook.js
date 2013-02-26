Yvi.FacebookUserController = Em.ArrayController.extend( Yn.FbAuth, {

	refresh: function() {

    var self = this;

    this.authFb(function(authResponse) {

      FB.api('/me/friends', {fields: 'name,id'}, function(response) {

        var content = Ember.A([]);
        var items = response.data.sort(function(a, b) {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });

        //items = items.slice(0, 20);
        content.pushObjects(items);
        content.set('isLoaded', true);
        self.set('content', content);

      });

    });

	}

});
