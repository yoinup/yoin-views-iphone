
Yvi.MapVenuesController = Em.ArrayController.extend({

  geopositionController: null,
  settings: null,

	refresh: function() {

		var coordinates = this.geopositionController.get('coordinates');
		var query = { lon: coordinates.lon,
									lat: coordinates.lat,
                  product_unit: true,
									limit: 40,
									distance: this.settings.queryVenuesDistance};


    var venues = App.store.find(Yn.Venue, query);
    this.set('content', venues);

  }

});
