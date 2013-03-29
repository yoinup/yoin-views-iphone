Yvi.InvitationCommentInputView = Yn.InputView.extend({
  user: null,

  placeholder: Em.computed(function() {
    var user = this.get('user');
    if ( !!user && user.get('isLoaded') ) {
      return I18n.t('reply_to') + ' ' + user.get('name');
    }
  }).property('user.isLoaded')

});

Yvi.InvitationScreenView = Yvi.ScreenView.extend({
	elementId: 'invitation-screen',

  loggedUser: null,
	invitation: null,
  hasResend: Em.computed(function(){
    return !this.get('invitation.recommendation'); 
  }).property('invitation.recommendation')

});
