
App.WalletScreenView = Yvi.WalletScreenView.extend({

  manager: 'App.walletManager',
  gestureDelegate: App.menuGestureDelegate,

  isInboxBinding: Em.Binding.oneWay('App.tabController.walletIsInbox'),

  inboxInvitationsBinding: Em.Binding.oneWay('App.inboxInvitationsController.sortedContent'),
  archivedInvitationsBinding: Em.Binding.oneWay('App.archivedInvitationsController.sortedContent'),

	initContentBinding: Em.Binding.oneWay('App.contentController.wallet')

});
