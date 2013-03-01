
Yvi.NearUsersController = Em.ArrayController.extend({

  refresh: function(coordinates) {
    var query = { lon: coordinates.lon,
                  lat: coordinates.lat };

    var array = App.store.find(Yn.User, query);
    this.set('content', array);
  }

});
