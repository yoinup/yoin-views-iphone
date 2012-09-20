
Yvi.AddPhoneInputView = Yn.InputView.extend({
  inputName:'phone',
  type: 'tel',
  placeholder: Em.computed(function() {
    
    return I18n.t('add_another_phone_number');

  }).property(),

  focusIn: function(event) {

    var value = this.get('value');
    if (!value) {
      var prefix;

      // TODO: improve accessing this kind of vars
      if ( Yn.Env.Settings ) {
        prefix = Yn.Env.Settings.phonePrefix;
      }

      this.set('value', prefix || '+34' );
    }
    this._super(event);

  }

});

Yvi.UserPhoneScreenView = Yvi.ScreenView.extend({

  elementId: 'user_phone_screen',

  user: null

});
