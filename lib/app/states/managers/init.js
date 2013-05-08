App.InitManager = Yvi.StateManager.extend({

  instanceName: 'App.initManager',
  enableLogging: false,
	logName: 'Init',

  initialState: 'logged',

  unlogged: App.InitUnloggedState.extend(),
  logged: Yvi.InitLoggedState.extend()

});
