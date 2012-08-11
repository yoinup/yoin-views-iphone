Yvi.MapView = Em.View.extend({

  elementId: 'map',

  zoom: 13,
  map: null,

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

  _createMap: function() {

    if ( this.get('isDomReady') && this.get('isMapReady') ) {

      var latlng = new google.maps.LatLng( 6, 6 );
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

      console.log('... create map');
      console.log( this.get('element') );
      var map = new google.maps.Map(this.get('element'), myOptions);
      this.set('map', map);
    }

  }

});
