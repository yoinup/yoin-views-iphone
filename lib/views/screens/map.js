
Yvi.mapGestureDelegate = Em.GestureDelegate.create({
  name: 'map_gesture_delegate',

  shouldReceiveTouch: function(gesture, view, event) {
    var result = true;

    var screenView = Em.View.views['map_screen'];

    if ( view instanceof Yvi.MapSectionView ) {
      result = screenView.get('isAsideBack');
    } else if ( view instanceof Yvi.MapCityView ) {
      result = true;
    } else if ( screenView.get('isAsideBack') ) {
      result = false;
    }
    return result; 
  }
});

Yvi.MapSectionView = Em.View.extend(Yn.Btap, {
  tapOptions: {
    delegate: Yvi.mapGestureDelegate
  },

	bTap: function() {
    this.triggerEvent( 'closeAside' );
  }

});

Yvi.CityAdaptativeButtonView = Yn.AdaptativeButtonView.extend({
  tapOptions: {
    delegate: Yvi.mapGestureDelegate
  }
});

Yvi.HeaderCloseButtonMapView = Yn.HeaderCloseButtonView.extend({
  tapOptions: {
    delegate: Yvi.mapGestureDelegate
  },
	bTap: function() {
    this.manager = ( App.qrManager.getPath('currentState.name') === 'map' ) ? App.qrManager : App.venuesManager;
    this.triggerEvent( this.get('action') );
  }
});

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


Yvi.MapCityView = Yn.IsSelectedBtapView.extend({

  tapOptions: {
    delegate: Yvi.mapGestureDelegate
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


Yvi.MapScreenView = Yvi.ScreenView.extend({
  elementId: 'map_screen',
  isOnGeopositionEnabler: false,
  classNameBindings: ['withHeaderAction', 'isAsideBack'],
  classNames: ['without-footer'],

  selectedCity: null,

  inputValue: null,

  showCities: false,
  withHeaderAction: true,


  didInsertElement: function() {
    this._super();
    this.containerMapView = Em.View.views['map-screen-container'];
  }

});
