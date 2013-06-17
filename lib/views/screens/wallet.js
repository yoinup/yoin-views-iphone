
Yvi.WalletOptionButtonView = Yn.IconBtapView.extend({
  isInbox: true,

  icon: Em.computed(function() {
    return this.get('isInbox') ? 'F' : 'b';
  }).property('isInbox')

});


Yvi.WalletContentView = Yn.ScrollerView.extend({
  isInbox: true,
  invitations: null,
  hasInvitations: Em.computed(function() {
    return !!this.get('invitations');
  }).property('invitations'),
  templateName: 'wallet_content'
});

Yvi.WalletScreenView = Yvi.ScreenView.extend({
	elementId: 'wallet-screen',

	inboxInvitations: null,
  archivedInvitations:null,
	setMinHeight: true,

  isInbox: false,
  initContent: true


});
