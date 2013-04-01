
Yvi.WalletOption = {
	received: 'wallet_received',
	sent: 'wallet_sent'
};

var options = Em.A([]);
options.pushObject({'name': Yvi.WalletOption.received, 'action': 'chooseReceived'});
options.pushObject({'name': Yvi.WalletOption.sent, 'action': 'chooseSent'});

Yvi.WalletContentView = Yn.ScrollerView.extend({

  templateName: 'wallet_content'
});

Yvi.WalletScreenView = Yvi.ScreenView.extend({
	elementId: 'wallet-screen',
	receivedInvitations: null,
  sentInvitations:null,
	setMinHeight: false,

	option: null,
  _options: options

});
