Yvi.InvitationCommentInputView = Yn.InputView.extend({
  user: null,
  invitation: null,
  loggedUser: null,

  placeholder: Em.computed(function() {
    var loggedUser = this.get('loggedUser'),
        toUser = this.get('invitation.toUser'),
        fromUser = this.get('invitation.fromUser');

    if ( !!loggedUser && loggedUser.get('isLoaded') && 
         !!toUser && toUser.get('isLoaded') &&
         !!fromUser && fromUser.get('isLoaded') ) {

      var user = (loggedUser === toUser) ? fromUser : toUser;
      return I18n.t('reply_to') + ' ' + user.get('name');
    }
  }).property('invitation.toUser.isLoaded', 'invitation.fromUser.isLoaded', 'loggedUser.isLoaded')

});

Yvi.InvitationScreenView = Yvi.ScreenView.extend({
	elementId: 'invitation-screen',

  loggedUser: null,
	invitation: null,
  hasResend: Em.computed(function(){
    return !this.get('invitation.recommendation'); 
  }).property('invitation.recommendation')

});
