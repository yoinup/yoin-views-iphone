Yvi.UserInteractionInvitationBlockView = Em.View.extend(Yn.Btap, {
	
  content: null,

  loggedUser: null,

  templateName: 'user_interaction_invitation_block',

  sentInvitation: Em.computed(function() {
  	return (this.getPath('content.fromUser') === this.get('loggedUser'));
  }).property('content', 'loggedUser'),

  receivedInvitation: Em.computed(function() {
  	return (this.getPath('content.toUser') === this.get('loggedUser'));
  }).property('content', 'loggedUser')

});
