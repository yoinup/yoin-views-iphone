
Yvi.NotificationScreenView = Yvi.ScreenView.extend({
  elementId: 'notification_screen',
	withoutFooter: true,

  user: null,
  agendaUser: null,
  facebookUser: null,

  canAgenda: true,
  canFb: Em.computed(function() {
    return !!this.get('facebookUser');
  }).property('facebookUser')

});
