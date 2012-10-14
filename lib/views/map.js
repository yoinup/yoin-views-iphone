Yvi.MapView = Em.View.extend( Yn.ContextManager, {

  classNames: ['map'],

  // internal configuration
  venueMarkerImage: "source/assets/map/pos32-5.png",
  meMarkerImage: "source/assets/map/pos32-yo2.png",
  zoom: 13,

  centerCoordinates: null,

  // internal properties
  //
  map: null,
  bubble: null,

  isDomReady: false,
  isMapReady: false,

  loadMapScript: true,

  isReady: Em.computed(function() {

    return this.get('isDomReady') && this.get('isMapReady');

  }).property('isDomReady', 'isMapReady'),

  init: function() {

    this._super();

    if ( this.get('loadMapScript') ) {

      var self = this;
      window.initmap = function() {
        self.set('isMapReady', true);
        //console.log('isMapReady');
        self.createMap();
      };

      var script = document.createElement('script'); 
      script.type = 'text/javascript'; 
      script.src = 'http://maps.google.com/maps/api/js?sensor=false&callback=initmap';
      //script.src = "http://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&sensor=TRUE_OR_FALSE&callback=initialize";
      
      var s = document.getElementsByTagName('script')[0]; 
      s.parentNode.insertBefore(script, s);

    }

  },

  didInsertElement: function() {

    this._super();
    this.set('isDomReady', true);
    //console.log('isDomReady');
    this.createMap();

  },

  didMapReady: function() {
    
  },

  clickMap: function(event) {

  },

  clickVenueBubble: function() {

  },

  clickVenuesBubble: function(venue) {

  },

  changeMe: function(me) {

    if ( this.get('isReady') && !!me) {

      var meMarker = this.get('meMarker');
      if ( !!meMarker ) {
        meMarker.setMap(null);
      }

      var map = this.get('map'),
          image;


      // center the map
      var mePosition = new google.maps.LatLng( me.lat, me.lon);
      map.setOptions({
        center: mePosition
      });

      image = new google.maps.MarkerImage( this.meMarkerImage, 
                                              new google.maps.Size(32, 39), 
                                              new google.maps.Point(0, 0), 
                                              new google.maps.Point(0, 39) );

      // insert new marker
      meMarker = new google.maps.Marker({
        position: mePosition,
        map: map,
        image: image,
        icon: image
      });

      this.set('meMarker', meMarker);

    }

  },

  showVenues: function(me, venues) {

    if ( this.get('isReady') && !!me && !!venues) {

      //console.log('update venue position' + venue.get('lat') + '  ' + venue.get('lon') );
      
      this.cleanMap();


      var map = this.get('map'),
          image;


      this.changeMe(me);


      var venueMarkers = Ember.A([]),
          marker;


      if (!!venues) {

        image = new google.maps.MarkerImage( this.venueMarkerImage, 
                                                new google.maps.Size(32, 39), 
                                                new google.maps.Point(0, 0), 
                                                new google.maps.Point(0, 39) );

        var self = this;
        venues.forEach( function(venue) {

          marker = new google.maps.Marker({
              position: new google.maps.LatLng( venue.get('lat'), venue.get('lon') ),
              map: map,
              icon: image,
              venue: venue
          });

          venueMarkers.pushObject(marker);


          google.maps.event.addListener(marker, 'click', function(event) {

            map.setOptions({
              center: new google.maps.LatLng( venue.get('lat'), venue.get('lon') )
            });

            self._closeBubble(); 
            var bubble = self._createBubble(venue); 

            google.maps.event.addListenerOnce(bubble, 'domready', function(){
                google.maps.event.addDomListener(bubble.contentContainer_, 'click', function(){
                  self.clickVenuesBubble(venue);
                });
            });


            self.set('bubble', bubble);
            bubble.open();

          });




        });
      }

      this.set('venueMarkers', venueMarkers);

    }


  },

  showVenue: function(venue) {

    if ( this.get('isReady') && !!venue) {

      //console.log('update venue position' + venue.get('lat') + '  ' + venue.get('lon') );

      var map = this.get('map');

      this.cleanMap();


      // center the map
      var venuePosition = new google.maps.LatLng( venue.get('lat'), venue.get('lon') );
      map.setOptions({
        center: venuePosition
      });

      var image = new google.maps.MarkerImage( this.venueMarkerImage, 
                                              new google.maps.Size(32, 39), 
                                              new google.maps.Point(0, 0), 
                                              new google.maps.Point(0, 39) );

      // insert new marker
      var venueMarker = new google.maps.Marker({
        position: venuePosition,
        map: map,
        image: image,
        icon: image
      });

      this.set('venueMarker', venueMarker);


			var bubble = this._createBubble(venue);

      var self = this;
      google.maps.event.addListenerOnce(bubble, 'domready', function(){
          google.maps.event.addDomListener(bubble.contentContainer_, 'click', function(){
            self.clickVenueBubble();
          });
      });
			this.set('bubble', bubble);
			bubble.open();

    }

  },

  cleanMap: function() {


    var venueMarkers = this.get('venueMarkers');
    if ( venueMarkers ) {
      venueMarkers.forEach( function(marker) {
        marker.setMap(null);
      });
    }

    var meMarker = this.get('meMarker');
    if ( !!meMarker ) {
      meMarker.setMap(null);
    }

    var venueMarker = this.get('venueMarker');
    if ( !!venueMarker ) {
      venueMarker.setMap(null);
    }

    this._closeBubble();

  },

  _closeBubble: function () {

    var bubble = this.get('bubble');
    if (!!bubble) {
      bubble.close();
      this.set('bubble', null);
    }

  },

  _createBubble: function(venue) {

    return new InfoBubble({
      map: this.get('map'),
      position: new google.maps.LatLng( venue.get('lat'), venue.get('lon') ),
      shadowStyle: 1,
      padding: 0.5,
      content: this._getBubbleContent( venue ),
      backgroundColor: '#333333',
      borderRadius: 5,
      arrowSize: 8,
      borderWidth: 1.5,
      borderColor: '#000000',
      disableAutoPan: true,

      maxWidth: 250,
      minWidth: 175,

      maxHeight: 100,
      //minHeight: 50,
      minHeight: 30,

      hideCloseButton: true,
      arrowPosition: 50,
      //backgroundClassName: 'map-bubble is-subtitle',
      backgroundClassName: 'map-bubble',
      arrowStyle: 0

    });

  },

  createMap: function() {

    if ( this.get('isDomReady') && this.get('isMapReady') ) {
      console.log('creating map.......');

      var centerCoordinates = this.get('centerCoordinates');
      if ( !centerCoordinates ) {

        centerCoordinates = {lat: 6, lon:6};

      }

      //console.log('OK ---->createMap');
      var latlng = new google.maps.LatLng(centerCoordinates.lat, centerCoordinates.lon);
      var myOptions = {
        zoom: this.zoom,
        mapTypeControl: false,
        navigationControl: true,
        disableDefaultUI: true,
        noClear: false,
        backgroundColor: '#E0DAD9',
        center: latlng,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggableCursor: 'crosshair'
      };

      var self = this;
      var map = new google.maps.Map(this.get('element'), myOptions);
      google.maps.event.addListener(map, 'click', function(event) {
        self.clickMap(event);
      });
      this.set('map', map);
      this.trigger('didMapReady');
    }

  },

  _getBubbleContent: function(venue) {

    var address = venue.get('address');
    return "<div class=\"title\">" + address +"</div>";

    //var city = venue.getPath('city.name');
    //return "<div class=\"title\">" + address +"</div><div class=\"subtitle\">"+city+"</div>";

  }

});
