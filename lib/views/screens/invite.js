Yvi.InviteWriteInputView = Yn.InputView.extend({

  username: null,

  placeholder: Em.computed(function() {

    return I18n.t('insert_a_message') + ' ' + this.get('username');

  }).property('username')

});

Yvi.InviteMainButtonView = Yn.MainButtonView.extend({

  username: null,

  content: Em.computed(function() {

    var username = this.get('username');
    if ( !!username ) {
      return I18n.t('give_to') + ' ' + username;
    } else {
      return I18n.t('send');
    }

  }).property('username')

});

Yvi.InviteScreenView = Yvi.ScreenView.extend(Yvi.HasUser, {
  elementId: 'invite-screen',
	setMinHeight: false,

  product: null,
  venue: null,
  invitation: null,

  isExecutingAction: false,

  hasUser: Em.computed(function() {
    return ( !!this.get('user') || !!this.get('agendaUser') || !!this.get('facebookUser') );
  }).property('user', 'agendaUser', 'facebookUser')

});
