
Yvi.NearUsersController = Em.ArrayController.extend({

  settings: null,
  loginUserController: null,

  refresh: function(coordinates) {
    var self = this,
        query = { lon: coordinates.lon,
                  distance: this.settings.queryVenuesDistance,
                  lat: coordinates.lat };

    var array = App.store.find(Yn.User, query);
    this.set('beingExcludedContent', null);
    array.then(function() {
      var user = self.get('loginUserController.content');
      if ( !!user ) {
        var content = Em.A([]);
        array.forEach(function(item) {
          if (item !== user ) {
            content.pushObject(item);
          }
        });

        content.set('isLoaded', true);
        self.set('beingExcludedContent', content);
      } else {
        self.set('beingExcludedContent', array);
      }

      

    });
  },

  beingExcludedContent: null

});
