Yvi.mapGestureDelegate = Em.GestureDelegate.create({
  name: 'map_gesture_delegate',

  shouldReceiveTouch: function(gesture, view, event) {
    var result = true;

    var screenView = Em.View.views['map-screen'];

    if ( view instanceof Yvi.MapSectionView ) {
      result = screenView.get('isAsideRight');
    } else if ( view instanceof Yvi.MapCityView ) {
      result = true;
    } else if ( screenView.get('isAsideRight') ) {
      result = false;
    }
    return result; 
  }

});

Yvi.MapCityView = Yn.IsSelectedBtapView.extend({
});

Yvi.MapSectionView = Em.View.extend(Yn.AsideFrontSection,  {
});


// TODO: is it necessary?
Yvi.MapFormInputView = Em.View.extend({
  tagName: 'form',
  attributeBindings: ['action'],

  action: 'action',

  submit: function(evt) {
    evt.preventDefault();
  }

});


Yvi.MapInputView = Em.View.extend(Yn.Input, {
	elementId: 'map_input',
	classNames: ['single-input'],
  type: 'search',

  search: function() {

    this.$().blur();
    var value = this._getCurrentInputValue();
    this.triggerEvent( 'search', value);

  }

});



Yvi.SwitchGeopositionEnablerButton = Yn.IconBtapView.extend({

  tapOptions: {
    delegate: Yvi.mapGestureDelegate
  },
  classNameBindings: ['isOn', 'isGrey', 'isFontBlack'],
  isOn: false,

  isGrey: Em.computed(function() {

    return !this.get('isOn');

  }).property('isOn'),

  isFontBlack: Em.computed(function() {

    return !this.get('isOn');

  }).property('isOn')

});


Yvi.MapScreenView = Yvi.ScreenView.extend( Yn.AsideContainer, {
  elementId: 'map-screen',
  isOnGeopositionEnabler: false,

  classNames: ['has-aside-right'],

	setMinHeight: false,
  selectedCity: null,

  inputValue: null,

  showCities: false,
  withHeaderAction: true,

  gestureDelegate: Yvi.mapGestureDelegate,


  didInsertElement: function() {
    // TODO: overwrite
    this._setContainerMapView();
		this._setLayout();

  },

	_setLayout: function() {
		var excludeHeights = Yn.jQueryCache.outerHeight('map-header',true);
		if ( this.get('withHeaderAction') ) {
			excludeHeights+=Yn.jQueryCache.outerHeight('map-header-action',true);
		}

		var height = Yn.jQueryCache.outerHeight('app',true)-excludeHeights;

		this.containerMapView.$().height(height); 

	},

  _setContainerMapView: function() {
    this.containerMapView = Em.View.views['map-screen-container'];
  }

});
