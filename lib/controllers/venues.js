
Yvi.VenuesController = Em.ArrayController.extend({
	offset: 0,
  content:  null,
  isRefreshed: false,
  settings: null,
  geopositionController: null,

  hasNext: Em.computed(function() {

    return this.get('_localHasNext') ? true : this.get('_serverHasNext');

  }).property('_serverHasNext', '_localHasNext'),

  _serverHasNext: false,
  _localHasNext: Em.computed(function() {

    return this.get('content.length') < this.get('localArray.length');

  }).property('content.length', 'localArray.length'),

  _isRefreshing: false,

  option: Yvi.CategoryItemOptions.all,

  init: function() {
    this._super();
    this.reset();
  },

	reset: function() {
    this.offset = 0;

    this.set('content', null );
    this.set('localArray', Em.A([]) );

		this.set('_serverHasNext', true);
    this._isRefreshing = false;
  },

	refresh: function() {

    //console.log('isRefreshing ' + this._isRefreshing + '  --> ' + this.get('_localHasNext') );

    if ( this._isRefreshing ) {
      return;
    }

    this._isRefreshing = true;

    var paginationLength = this.settings.queryVenuesPaginationLength,
        content = this.get('content'),
        localArray = this.get('localArray');

    if ( !this.get('_localHasNext') ) {

      var fetch = this.settings.queryVenuesFetch,
          distance = this.settings.queryVenuesDistance,
          coordinates = this.geopositionController.get('coordinates');

      var query = { lon: coordinates.lon,
                    lat: coordinates.lat,
                    limit: fetch,
                    product_unit: true,
                    distance: distance,
                    offset: this.offset };


      if ( this.option === Yvi.CategoryItemOptions.top ) {
        query.order_by = 'top-venues';
      } else if ( this.option !== Yvi.CategoryItemOptions.all) {
        query.products__category_id = this.option.get('id');
      }

      var self = this,
          venues = App.store.find(Yn.Venue, query);
      venues.one('didLoad', function() {

        var length = venues.get('length');

        if ( length > 0 ) { 

          self.offset += length;
          //console.log( 'venues isloaded ' +venues.get('length') + ' offset ' + self.offset);

          var sortedContent = [];
          venues.forEach(function(venue) {
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

          localArray.pushObjects(sortedContent);
          if ( !content ) {
            content = Em.A([]);
          }

          self._addPaginationItems(content, localArray);

        } else {
          content = Em.A([]);
          if ( !self.get('content') ) {
            self.set('content', content );
          }
        }

        self.set('_serverHasNext', length === paginationLength );
        self._isRefreshing = false;

      });

    } else {

      this._addPaginationItems(content, localArray);
      this._isRefreshing = false;

    }

  },

  _addPaginationItems: function(content, localArray) {

    var paginationLength = this.settings.queryVenuesPaginationLength;
    var currentLength = content.get('length');

    var items = localArray.slice(currentLength, currentLength+paginationLength);
    content.pushObjects( items );
    this.set('content', content);

  }

});

//Uncaught Error: The result of a server query (on Yn.Venue) is immutable.
//http://stackoverflow.com/questions/11895629/add-delete-items-from-ember-data-backed-arraycontroller
