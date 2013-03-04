
Yvi.StatusToggleCircleButtonView = Yn.ToggleCircleButtonView.extend({

  actionContentBinding: Em.Binding.oneWay('i18nContent'),

  // TODO: FIX
  i18nContent: Em.computed(function() {
    return I18n.t( this.get('content') );
  }).property('content'),


  isSelected: Em.computed(function(){

    return this.get('selected') === this.get('i18nContent');

  }).property('selected', 'i18nContent')

});

Yvi.UserStatusScreenView = Yvi.ScreenView.extend({
  elementId: 'user-status-screen',

  user: null,
  userStatusInput: null,

  options: Em.A([
    {name: 'user_status_available'},
    {name: 'user_status_busy'},
    {name: 'user_status_having_fun'}
  ])

});
