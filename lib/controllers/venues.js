
Yvi.VenuesController = Em.ArrayController.extend({
	offset: 0,
  content:  null,
  isRefreshed: false,
  settings: null,
  geopositionController: null,

  currentPromise: null,

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

    // TODO: improve it somehow
    if (!!this.currentPromise ) {
      //console.log('call promise.reject');
      this.currentPromise.reject('reseting promise');
    }

    this.set('content', Em.A([]) );
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
                    offset: this.offset },
          self = this;


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

          self.offset += length;
          //console.log( 'items isloaded ' +items.get('length') + ' offset ' + self.offset);

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

          localArray.pushObjects(sortedContent);
          self._addPaginationItems(content, localArray);

        }

        self.set('_serverHasNext', length === paginationLength );
        self._isRefreshing = false;

        //console.log('end: promise execution ');

      }, function(error) {
        console.log('promise was canceled ' +error);
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

    //console.log(currentLength + ' ' +paginationLength + ' ' + items.length);
    this.set('content', content);

  }

});

