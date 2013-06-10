Yvi.HasUser = Em.Mixin.create({
  user: null,
  agendaUser: null,
  facebookUser: null,
  username: null,

  hasUser: Em.computed(function() {
    return ( !!this.get('user') || !!this.get('agendaUser') || !!this.get('facebookUser') );
  }).property('user', 'agendaUser', 'facebookUser')

});
