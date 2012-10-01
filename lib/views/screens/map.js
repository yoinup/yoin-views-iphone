
Yvi.MapInputView = Em.View.extend(Yn.Input, {
	elementId: 'map_input',
	classNames: ['single-input']

});

Yvi.SwitchGeopositionEnablerButton = Yn.IconBtapView.extend({
  classNameBindings: ['isOn'],
  isOn: false

});


Yvi.MapScreenView = Yvi.ScreenView.extend({
  elementId: 'map_screen',
  switchGeopositionEnablerButtonIsOn: false,


  didInsertElement: function() {
    this._super();
    this.containerMapView = Em.View.views['map-screen-container'];
  }

});
