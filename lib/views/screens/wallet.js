
Yvi.WalletOption = {
	received: 'wallet_received',
	sent: 'wallet_sent'
};

var options = Em.A([]);
options.pushObject({'name': Yvi.WalletOption.received, 'action': Yvi.WalletOption.received});
options.pushObject({'name': Yvi.WalletOption.sent, 'action': Yvi.WalletOption.sent});

Yvi.WalletContentView = Yn.ScrollerView.extend({
  areReceivedInvitations: true,
  templateName: 'wallet_content'
});

Yvi.WalletScreenView = Yvi.ScreenView.extend({
	elementId: 'wallet-screen',
	receivedInvitations: null,
  sentInvitations:null,
	setMinHeight: true,

	option: null,
  _options: options

});
