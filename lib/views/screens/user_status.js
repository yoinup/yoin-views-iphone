
Yvi.UserStatusScreenView = Yvi.ScreenView.extend({
  elementId: 'user_status_screen',

  user: null,

  options: Em.A([
    {name: 'user_status_available'},
    {name: 'user_status_busy'},
    {name: 'user_status_having_fun'}
  ])

});
