
Yvi.LoginScreenType = {
  fbLogin: 0,
  emailLogin: 1,
  emailRegister:2,
  passwordReset: 3,
  passwordChange: 4
};

Yvi.LoginScreenView = Yn.ScreenView.extend({
  elementId: 'login-screen',
  classNameBindings: ['hasConnection'],
  classNames: ['landing-screen'],

  isBlocked: null,
  hasConnection: true,
  option: Yvi.LoginScreenType.fbLogin,

  isEmailLogin: Em.computed(function() {
    return this.get('option') === Yvi.LoginScreenType.emailLogin;
  }).property('option'),

  isEmailRegister: Em.computed(function() {
    return this.get('option') === Yvi.LoginScreenType.emailRegister;
  }).property('option'),

  isPasswordReset: Em.computed(function() {
    return this.get('option') === Yvi.LoginScreenType.passwordReset;
  }).property('option'),

  isPasswordChange: Em.computed(function() {
    return this.get('option') === Yvi.LoginScreenType.passwordChange;
  }).property('option'),

  isFbLogin: Em.computed(function() {
    return this.get('option') === Yvi.LoginScreenType.fbLogin;
  }).property('option')

});
