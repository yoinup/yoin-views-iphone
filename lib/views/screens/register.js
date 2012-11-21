
Yvi.RegisterScreenView = Em.View.extend({
  elementId: 'register_screen',

  classNameBindings: ['isPendingPhoneValidation'],
  classNames: ['landing-screen', 'screen'],

  isPendingPhoneValidation: true,

  isBlocked: null,

  templateName: 'register_screen'

});
