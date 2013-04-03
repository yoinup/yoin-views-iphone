
Yvi.VenuesController = Em.ArrayController.extend({
  content:  null,
  settings: null,
  geopositionController: null,

  currentPromise: null,

  option: Yvi.CategoryItemOptions.all,

  init: function() {
    this._super();
    this.reset();
  },

	reset: function() {

    // TODO: improve it somehow
    if (!!this.currentPromise ) {
      //console.log('call promise.reject');
      this.currentPromise.reject('reseting promise');
    }

    this.set('content', Em.A([]) );
  },

	refresh: function() {

    var fetch = this.settings.queryVenuesFetch,
        distance = this.settings.queryVenuesDistance,
        content = this.get('content'),
        self = this,
        coordinates = this.geopositionController.get('coordinates');

    var query = { lon: coordinates.lon,
                  lat: coordinates.lat,
                  limit: fetch,
                  product_unit: true,
                  distance: distance };


    if ( this.option === Yvi.CategoryItemOptions.top ) {
      query.order_by = 'top-venues';
    } else if ( this.option !== Yvi.CategoryItemOptions.all) {
      query.products__category_id = this.option.get('id');
    }
    
    this.currentPromise = App.store.find(Yn.Venue, query);
    this.currentPromise.then(function(items) {

      
      //console.log('start: promise execution ');
      var length = items.get('length');
      if ( length > 0 ) { 

        var sortedContent = [];
        items.forEach(function(venue) {
          sortedContent.pushObject(venue);
        });

        if ( self.option === Yvi.CategoryItemOptions.top ) {
          sortedContent = sortedContent.sort(function(a,b) {
            return a.get('likeCount') - b.get('likeCount');
          });
        } else {
          sortedContent = sortedContent.sort(function(a,b) {
            return a.get('distance') - b.get('distance');
          });
        }

        content.pushObjects(sortedContent);
        content.set('isLoaded', true);
      }

      self.set('content', content);

    }, function(error) {
      console.log('promise was canceled ' +error);
    });

  }

});
