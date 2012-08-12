Yvi.MapView = Em.View.extend( Yn.ContextManager, {

  elementId: 'map',

  //params
  venue: null,

  // internal configuration
  venueMarkerImage: "source/assets/map/pos32-5.png",
  zoom: 13,

  // internal properties
  map: null,
  bubble: null,

  isDomReady: false,
  isMapReady: false,

  init: function() {

    this._super();

    var self = this;
    window.initmap = function() {
      self.set('isMapReady', true);
      self._createMap();
    };

		var script = document.createElement('script'); 
		script.type = 'text/javascript'; 
		script.src = 'http://maps.google.com/maps/api/js?sensor=false&callback=initmap';
		//script.src = "http://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&sensor=TRUE_OR_FALSE&callback=initialize";
		
		var s = document.getElementsByTagName('script')[0]; 
		s.parentNode.insertBefore(script, s);

  },

  didInsertElement: function() {

    this._super();
    this.set('isDomReady', true);
    this._createMap();

  },

  clickVenueBubble: function() {

  },

  _venueChanged: Em.observer(function() {

    this._updateVenuePosition();

  }, 'venue'),


  _createMap: function() {

    if ( this.get('isDomReady') && this.get('isMapReady') ) {

      var latlng = new google.maps.LatLng(6, 6);
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

      var map = new google.maps.Map(this.get('element'), myOptions);
      this.set('map', map);
      this._updateVenuePosition();
    }

  },


  _updateVenuePosition: function() {

    var map = this.get('map');
    var venue = this.get('venue');

    if ( !!map && !!venue) {


      //console.log('update venue position' + venue.get('lat') + '  ' + venue.get('lon') );

      // remove old marker
      var venueMarker = this.get('venueMarker');
      if ( !!venueMarker ) {
        venueMarker.setMap(null);
      }

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
      venueMarker = new google.maps.Marker({
        position: venuePosition,
        map: map,
        image: image,
        icon: image
      });

      this.set('venueMarker', venueMarker);

			this._closeBubble(); 

			var bubble = new InfoBubble({
				map: this.get('map'),
				position: new google.maps.LatLng( venue.get('lat'), venue.get('lon') ),
				shadowStyle: 1,
				padding: 0.5,
				content: this._getBubbleContent( venue ),
				backgroundColor: '#665f59',
				borderRadius: 8,
				arrowSize: 10,
				borderWidth: 1.5,
				borderColor: '#4d4646',
				disableAutoPan: true,

				maxWidth: 250,
				minWidth: 150,

				maxHeight: 100,
				//minHeight: 50,
				minHeight: 30,

				hideCloseButton: true,
				arrowPosition: 50,
				//backgroundClassName: 'map-bubble is-subtitle',
				backgroundClassName: 'map-bubble',
				arrowStyle: 0

			});
      
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

  _getBubbleContent: function(venue) {

    var address = venue.get('address');
    return "<div class=\"title\">" + address +"</div>";

    //var city = venue.getPath('city.name');
    //return "<div class=\"title\">" + address +"</div><div class=\"subtitle\">"+city+"</div>";

  },

  _closeBubble: function() {

    var bubble = this.get('bubble');
    if (!!bubble) {
      bubble.close();
      this.set('bubble', null);
    }

  }


});
