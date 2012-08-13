
Yvi.UserStatusInputView = Em.View.extend(Yn.Input, {
  elementId: 'user-status-input',

  placeholder: Em.computed(function()  {
    return I18n.t('write_status_message');
  }).property(),

  type: 'text'

});


Yvi.UserStatusScreenView = Yvi.ScreenView.extend({
  elementId: 'user_status_screen',

  user: null,

  options: Em.A([
    {name: 'user_status_available'},
    {name: 'user_status_busy'},
    {name: 'user_status_having_fun'}
  ])

});
