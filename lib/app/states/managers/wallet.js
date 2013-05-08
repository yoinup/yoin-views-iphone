App.WalletManager = Yvi.StateManager.extend({

  instanceName: 'App.walletManager',
  enableLogging: false,
	logName: 'Wallet',

  initialState: 'wallet',

  wallet: Yvi.WalletWalletState.extend(),
  scanInvitation: Yvi.ScanInvitationState.extend(),
  map: Yvi.MapState.extend(),
  invitation: Yvi.InvitationState.extend(),
  terms: Yvi.TermsState.extend()

});
