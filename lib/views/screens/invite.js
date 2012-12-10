
Yvi.InviteScreenView = Yvi.ScreenView.extend({
  elementId: 'invite_screen',
  classNames: ['without-footer'],
  product: null,
  venue: null,
  invitation: null,
  
  user: null,
  agendaUser: null,
  facebookUser: null,

  hasUser: Em.computed(function() {
    return ( !!this.get('user') || !!this.get('agendaUser') || !!this.get('facebookUser') );
  }).property('user', 'agendaUser', 'facebookUser')

});
