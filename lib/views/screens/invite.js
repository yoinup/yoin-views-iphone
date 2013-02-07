Yvi.InviteWriteInputView = Yn.InputView.extend({

  user: null,
  agendaUser: null,
  facebookUser: null,

  placeholder: Em.computed(function() {

    var user = this.get('user'),
        name;
    if (!!user) {
      name = user.get('name');

    } else {

      user = this.get('agendaUser');
      if (!!user) {
        name = user.name;

      } else {

        user = this.get('facebookUser');
        if (!!user) {
          name = user.name;

        }

      }

    }
    return I18n.t('insert_a_message') + ' ' + name;

  }).property('user')

});

Yvi.InviteScreenView = Yvi.ScreenView.extend({
  elementId: 'invite_screen',
	withoutFooter: true,
	setMinHeight: false,

  product: null,
  venue: null,
  invitation: null,
  
  user: null,
  agendaUser: null,
  facebookUser: null,

  isExecutingAction: false,

  hasUser: Em.computed(function() {
    return ( !!this.get('user') || !!this.get('agendaUser') || !!this.get('facebookUser') );
  }).property('user', 'agendaUser', 'facebookUser')

});
