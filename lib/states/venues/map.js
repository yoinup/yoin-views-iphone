
Yvi.VenuesMapState = Em.State.extend({

  enter: function(sm) {
    this._super(sm);
    this.backState = sm.get('currentState').get('name');
  },

  exit: function(sm) {

    App.mapScreenView.set('isHidden', true);
    this._super(sm);

  },

  close: function(sm) {
    App.uiManager.initAsyncEvent();
    sm.goToState(this.backState);
  },

  openCities: function(sm) {
    App.uiManager.initAsyncEvent();
    App.asideController.set('mapCities', true);
  },

  closeAside: function(sm) {
    App.uiManager.initAsyncEvent();
    App.asideController.set('mapCities', false);
  },

  selectCity: function(sm, city) {
    App.uiManager.initAsyncEvent();
    var coordinates = {lat: city.get('lat'),
                       lon: city.get('lon')};
    this._changeMePosition(coordinates);
    App.asideController.set('mapCities', false);
  },

  switchGeopositionEnabler: function(sm) { 

    var value = App.buttonController.get('geopositionEnabler');
    App.buttonController.set('geopositionEnabler', !value);

  },

  changeGeoposition: function(sm, event) { 

    if ( App.buttonController.get('geopositionEnabler') ) {

      var coordinates = {lat: event.latLng.Xa,
                         lon: event.latLng.Ya};

      this._changeMePosition(coordinates);
    }

  },

  _search: function(text) {

    App.uiManager.initAsyncEvent();
    var geocoder = new google.maps.Geocoder(),
        self = this;

    geocoder.geocode( {'address': text}, function(results, status) { 

      if ( status === google.maps.GeocoderStatus.OK ) { 
          var loc = results[0].geometry.location;

          // use loc.lat(), loc.lng()
          var coordinates = {lat: loc.lat(),
                             lon: loc.lng() };

          //console.log(loc);
          self._changeMePosition(coordinates);
      } 
      else {
        // show error message
        console.log('not found');
      } 
      
      App.inputsController.set('searchMap', null);
      App.uiManager.endAsyncEvent();
    });

  },

  _changeMePosition: function(coordinates ) {

    App.geopositionController.refreshPosition(undefined, coordinates);
    App.mapScreenView.mapView.changeMe(coordinates);

  }

});
