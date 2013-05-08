App.CheckoutManager = Yvi.StateManager.extend({

  instanceName: 'App.checkoutManager',
  enableLogging: false,
	logName: 'Checkout',

  initialState: 'closed',

	navigationView: null, 

  invite: Yvi.CheckoutInviteState.extend(),
  map: Yvi.MapState.extend(),
  notification: App.CheckoutNotificationState.extend(),
  closed: Yvi.CheckoutClosedState.extend()

});
