
Yvi.NearUsersController = Em.ArrayController.extend({

  settings: null,

  refresh: function(coordinates) {
    var query = { lon: coordinates.lon,
                  distance: this.settings.queryVenuesDistance,
                  lat: coordinates.lat };

    var array = App.store.find(Yn.User, query);
    this.set('content', array);
  }

});
