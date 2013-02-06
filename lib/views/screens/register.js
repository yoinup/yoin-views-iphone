
Yvi.RegisterScreenView = Yn.ScreenView.extend({
  elementId: 'register_screen',

  classNameBindings: ['isPendingPhoneValidation'],
  classNames: ['landing-screen'],

  isPendingPhoneValidation: true,

  isBlocked: null

});
