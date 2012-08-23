
Yvi.MapInputView = Em.View.extend(Yn.Input, {
	
	elementId: 'map_input',
	
	classNames: ['single-input']

});

Yvi.MapScreenView = Yvi.ScreenView.extend({
  elementId: 'map_screen',



  didInsertElement: function() {
    this._super();
    this.containerMapView = Em.View.views['map-screen-container'];
  }

});
