
Yvi.NotificationScreenView = Yvi.ScreenView.extend({
  elementId: 'notification-screen',

  user: null,
  agendaUser: null,
  facebookUser: null,

  canSms: true,
  canFb: Em.computed(function() {
    return !!this.get('facebookUser') || !!this.get('user.fbChannel');
  }).property('facebookUser')

});
