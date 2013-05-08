
App.MapScreenView = Yvi.MapScreenView.extend( Yvi.PrerenderModal, {
  coordinatesBinding: Em.Binding.oneWay('App.geopositionController.coordinates'),

  classNames: ['is-layer-top'],

  init: function() {

    this._super();
    this.on('transitionHide', function() {
      var mapView = this.containerMapView
            .get('childViews')
            .popObject();

      mapView.destroy();
    });

  },

  didInsertElement: function() {

    // TODO: emberjs issue: classNameBindings does not work in prerender state
    this.set('withHeaderAction', this.get('_withHeaderAction') );

    this._setContainerMapView();
		this._setLayout();

    var self = this;    
    Em.run.next(function() {

      var coordinates = self.get('coordinates');

      var view = Yvi.MapView.create({
        loadMapScript: false,
        centerCoordinates: coordinates,

        didInsertElement: function() {
          this.didInsertElementBase();
          var showVenue = self.get('showVenue'),
              self2 = this;

          if ( showVenue === true ) {
            self2.showVenue(self.get('venue'));
          }
          else {
            self2.showVenues(coordinates, self.get('venues'));
          }
        },

        clickVenuesBubble: function(venue) {
          this.triggerEvent('selectVenueOnMap', venue);
        },

        clickMap: function(event) {
          if ( App.buttonController.get('geopositionEnabler') ) {
            this.triggerEvent('changeGeoposition', event);
          }
        }

                                   
      });
      view.set('isMapReady', true);

      self.containerMapView
                      .get('childViews')
                      .pushObject(view);

      self.set('isHidden', false);
      
      // to access internal properties
      self.mapView = view;

    });

  }


});
