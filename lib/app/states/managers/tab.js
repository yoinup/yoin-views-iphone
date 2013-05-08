App.TabManager = Yvi.StateManager.extend({

  instanceName: 'App.tabManager',
  enableLogging: false,
	logName: 'Tab',

  initialState: 'venues',

  venues: Yvi.TabBaseState.extend(),
  wallet: Yvi.TabBaseState.extend(),
  settings: Yvi.TabBaseState.extend()

});
