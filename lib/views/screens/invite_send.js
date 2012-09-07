Yvi.InviteSendInputView = Em.View.extend(Yn.Input, {

  //The elementId will be inserted in handlebars for each type

  classNames: ['single-input'],

  default_text: null,

  placeholder: Em.computed(function()  {
    return I18n.t(this.get('default_text')); //write_something_message
  }).property(),

  type: 'text'

});


Yvi.InviteSendScreenView = Yvi.ScreenView.extend({
  elementId: 'invite_send_screen',

  product: null,
  venue: null,

  contactUser: null,
  fbUser: null,
  user: null,

  smsNotification: null,

  mailNotification: null,

  facebookNotification: null,

  twitterNotification: null

});
