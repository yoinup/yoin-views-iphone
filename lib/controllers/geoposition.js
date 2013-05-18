

Yvi.GeopositionController = Em.Object.extend({

	// notify if user has geoposition enabled or disabled
  isOn: undefined,
	coordinates: null,
  settings: null,

  nearUsersController: null,
  venuesController: null,
  mapVenuesController: null,
  cityController: null,

	refreshPosition: function(next, coor) {


		var coordinates;

		if ( !coor && this.settings.geopositionWithDefaultCity === true ) {

      this.set('isOn', true);
      this._refreshPositionWithDefaultCity(next);

    } else if ( !coor && App.isNative ) {

			var self = this;

      navigator.geolocation.getCurrentPosition( function(response ) {
        console.log('gcp: success');
        if ( !!response.coords.latitude && !!response.coords.longitude) {
          coordinates = { lat: response.coords.latitude,
                          lon: response.coords.longitude};

          self.set('isOn', true);
          self._setCoordinates(coordinates);
        }  else {
          self.set('isOn', false);
          self._refreshPositionWithDefaultCity(undefined);
        }
      }, function(error) {
        console.log('gcp: error');
				self.set('isOn', false);
        self._refreshPositionWithDefaultCity(next);
      }, { maximumAge: 3000, timeout: 1000 });

		} else {

			coordinates = (!!coor ) ? coor : this.settings.coordinates; 
			if ( !!coordinates ) {
        this.set('isOn', true);
        this._setCoordinates(coordinates, next);
			}  else {
        this.set('isOn', false);
        this._refreshPositionWithDefaultCity(next);
      }

		}

	},

  _refreshPositionWithDefaultCity: function(next) {
    var defaultCity = this.cityController.get('defaultCity');
    if ( !!defaultCity ) {
      this._setCoordinates( defaultCity, next);
    } else {
      // TODO: improve ii
      App.notificationController.error();
      if (!!next) { next(); }
    }
  },

  _setCoordinates: function(coordinates, next) {

    var closestCity;

    if ( !!coordinates.lat || !!coordinates.lon ) {

      var to = new LatLon(coordinates.lat, coordinates.lon),
          closestDist = Number.MAX_VALUE,
          dist,
          from,
          cities = this.cityController.get('content');

      cities.forEach(function(city, i) {

        from = new LatLon(city.get('lat'), city.get('lon'));
        dist = from.distanceTo(to);

        if ( closestDist > dist ) {
          closestDist = dist;
          closestCity = city;
        }

      });


    } else {
      // TODO: this is wrong
      closestCity = coordinates;
      coordinates = { lat: closestCity.get('lat'), 
                      lon: closestCity.get('lon') };
    }
    
    this.set('coordinates', coordinates);
    this.cityController.set('selected', closestCity);

    if (!!next) { next(); }

  },

  // When coordinates changed, reset dependent controllers
  _coordinatesChanged: Em.observer(function() {

    this.venuesController.reset();

    var coordinates = this.get('coordinates');
    if ( !!coordinates ) {

			this.venuesController.refresh();

      if (this.nearUsersController )  {
        this.nearUsersController.refresh(coordinates);
      }
    }

  }, 'coordinates')
  
});
