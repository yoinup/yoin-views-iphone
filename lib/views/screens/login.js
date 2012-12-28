
Yvi.LoginScreenView = Em.View.extend({
  elementId: 'login_screen',
  classNameBindings: ['hasConnection'],
  classNames: ['landing-screen', 'screen'],

  isBlocked: null,
  hasConnection: true,

  templateName: 'login_screen'

});
