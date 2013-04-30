// TODO: temporal
Yvi.Application = Yn.Application.extend({

  // TODO: this can be improved to pass a parameter to enable/disable side-loading
  _sideloadingInitData: function(user) {

    var categories = App.store.findMany(Yn.Category, user.get('sideCategories') );
    App.categoryController.set('content', categories );

    var sideCities = user.get('sideCities'); 
    var defaultCity = sideCities.find(function(city) {
      return city.get('isDefault');
    });

    var cities = App.store.findMany(Yn.City, sideCities );
    App.cityController.set('content', cities );
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

  // TODO: MOVE to ApplicationEventManager
  addRealNotifications: function(user) {

    var pusher,
        channel;

    if ( !this.rtManager ) {

      var conf = this.settings.pusher;

      pusher = new Pusher(conf.apiKey);
      this.rtManager = {
        pusher: pusher
      };

      if (conf.log) {
        Pusher.log = function(message) {
          if (window.console && window.console.log) {
            window.console.log(message);
          }
        };
      }

    } else {
      pusher = this.rtManager.pusher;
    }

    if ( !!this.rtManager.channel ) { this.removeRealNotifications(); }

    channel = pusher.subscribe('user-'+user.get('id'));

    channel.bind('pusher:subscription_error', function(status) {
      console.log('pusher error');
    });

    channel.bind('refresh-received', function() {
      //TODO:  backend does not return invitation DATA
      App.walletController.refresh();
      App.notificationController.refresh();
    });
    channel.bind('refresh-sent', function() {
      App.walletController.refresh();
      App.notificationController.refresh();
    });
    channel.bind('refresh-notification', function() {
      App.walletController.refresh();
      App.notificationController.refresh();
    });

    this.rtManager.channel = channel;

  },

  // MOVE to ApplicationEventManager
  removeRealNotifications: function() {

    var rt = this.rtManager;
    rt.pusher.unsubscribe(rt.channel.name);
    rt.channel = null;

  },

  // MOVE to ApplicationEventManager
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
