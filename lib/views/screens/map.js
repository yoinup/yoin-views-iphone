
Yvi.HeaderCloseButtonMapView = Yn.HeaderCloseButtonView.extend({
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
  classNameBindings: ['withHeaderAction'],
  classNames: ['without-footer'],

  inputValue: null,

  withHeaderAction: true,


  didInsertElement: function() {
    this._super();
    this.containerMapView = Em.View.views['map-screen-container'];
  }

});
