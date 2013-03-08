// TODO: temporal
Yvi.Application = Yn.Application.extend({

  _loadInitData: function(next, error) {

    var categories = App.store.findQuery(Yn.Category, {});
    categories.one('didLoad', function() {

      App.categoryController.set('content', categories);
      var cities = App.store.findQuery(Yn.City, {});
      cities.one('didLoad', function() {

        App.cityController.set('content', cities);
        var defaultCity = cities.find(function(city) {
          return city.get('isDefault');
        });
        App.cityController.set('defaultCity', defaultCity);
        next();

      });

    });

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
    App.geopositionController.refreshPosition(function() {

      var checkin = Yn.Checkin.createRecord(coordinates);
      checkin.on('didCreate', function(item) {
        //console.log('didCreate checkin');
      });
      checkin.on('didCreateError', function(item) {
        console.log('didCreateError checkin');
      });
      App.store.commit();

    }, coordinates);

    if ( !!App.nearUsersController ) {
      App.nearUsersController.refresh(coordinates);
    }

  }

});
