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

  }

});
