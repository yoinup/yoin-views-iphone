
Yvi.MapInputView = Em.View.extend(Yn.Input, {
	elementId: 'map_input',
	classNames: ['single-input']

});

Yvi.SwitchGeopositionEnablerButton = Yn.IconBtapView.extend({
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
  classNames: ['is-complete-screen'],


  didInsertElement: function() {
    this._super();
    this.containerMapView = Em.View.views['map-screen-container'];
  }

});
