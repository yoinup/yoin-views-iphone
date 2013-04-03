// TODO: temporal
Yvi.Application = Yn.Application.extend({

  // TODO: this can be improved to pass a parameter to enable/disable side-loading
  _sideloadingInitData: function(user) {
    var categories = user.get('sideCategories'); 

    var cities = user.get('sideCities'); 
    var defaultCity = cities.find(function(city) {
      return city.get('isDefault');
    });

    App.categoryController.set('content', categories);
    App.cityController.set('content', cities);
    App.cityController.set('defaultCity', defaultCity);
  },

  _initStore: function() {

    var adapter = Yn.DjangoTastypieAdapter.create({
      url: this.settings.server
    });

    this.store = Yn.Store.create({
      adapter: adapter
    });

  },

  locationMonitorUpdate: function(event) {

    var coordinates = {lat: event.new_latitude, lon: event.new_longitude},
        self = this;

    console.log('locationMonitorUpdate ' + coordinates.lat + ' ' +coordinates.lon);

    App.geopositionController.refreshPosition(null, coordinates);

    var checkin = Yn.Checkin.createRecord(coordinates);
    checkin.on('didCreate', function(item) {
      console.log('didCreate checkin');
    });
    checkin.on('didCreateError', function(item) {
      console.log('didCreateError checkin');
    });
    App.store.commit();

  },

  _loadUser: function(next) {

    var self = this;
    var fn = function(credentials) {

      self.loadUser( credentials, function(user) {

        var initState;
        if ( !!user ) {

          self._sideloadingInitData(user);

          // refresh with native geolocation, otherwise defaultCity
          App.geopositionController.refreshPosition();
          self.userDidLogin(user, credentials);
          next(user.get('isActive'));

        } else {
          next(false);
        }

      });

    };

    App.localStore.get(App.localStoreKeys.loginCredential, function(key, credentials) {
      fn(credentials);
    }, function(error, key) {
      fn(undefined);
      console.log('error credential \n' + error);
    });

  }

});
