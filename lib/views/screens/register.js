
Yvi.RegisterScreenView = Em.View.extend({
  elementId: 'register_screen',

  classNameBindings: ['isPendingPhoneValidation'],
  classNames: ['landing-screen', 'screen'],

  isPendingPhoneValidation: false,

  isBlocked: null,

  templateName: 'register_screen'

});
