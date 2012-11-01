
Yvi.RegisterScreenView = Em.View.extend({
  elementId: 'register_screen',

  classNameBindings: ['isUserInactive'],
  classNames: ['landing-screen', 'screen'],

  isUserInactive: true,

  isBlocked: null,

  templateName: 'register_screen'

});
