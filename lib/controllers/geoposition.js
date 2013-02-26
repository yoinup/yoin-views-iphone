
Yvi.GeopositionController = Em.Object.extend({

	// notify if user has geoposition enabled or disabled
  isOn: undefined,
	coordinates: null,
  settings: null,

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
			navigator.geolocation.getCurrentPosition( function(response) {
				
        if ( !!response.coords.latitude && !!response.coords.longitude) {
          coordinates = { lat: response.coords.latitude,
                          lon: response.coords.longitude};

          self.set('isOn', true);
          self._setCoordinates(coordinates, next);
        }  else {
          self.set('isOn', false);
          self._refreshPositionWithDefaultCity(next);
        }

			}, function(error) {

				self.set('isOn', false);
        self._refreshPositionWithDefaultCity(next);

			});

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
    this._setCoordinates( this.cityController.get('defaultCity'), next);
  },

  _setCoordinates: function(coordinates, next) {

    var closestCity;

    if ( !!coordinates.lat || !!coordinates.lon ) {

      var to = new google.maps.LatLng(coordinates.lat, coordinates.lon),
          closestDist = Number.MAX_VALUE,
          dist,
          from,
          cities = this.cityController.get('content');

      cities.forEach(function(city, i) {
        from = new google.maps.LatLng(city.get('lat'), city.get('lon'));
        dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
        /*
        console.log('-----------------------');
        console.log(city.get('name') );
        console.log(closestDist);
        console.log(dist);
        */
        if ( closestDist > dist ) {
          closestDist = dist;
          closestCity = city;
        }
      });

    } else {
      closestCity = coordinates;
      coordinates = { lat: closestCity.get('lat'), 
                      lon: closestCity.get('lon') };
    }
    
    this.set('coordinates', coordinates);
    this.cityController.set('selected', closestCity);

    next();

  },

  // When coordinates changed, reset dependent controllers
  _coordinatesChanged: Em.observer(function() {

    this.venuesController.reset();

    var coordinates = this.get('coordinates');
    if ( !!coordinates ) {

      if (!! this.mapVenuesController )  {
        this.mapVenuesController.refresh();
      }
			this.venuesController.refresh();
    }

  }, 'coordinates')
  
});
