App.MeManager = Yvi.StateManager.extend({

  instanceName: 'App.meManager',
  enableLogging: false,
	logName: 'Me',

  initialState: 'settings',

	navigationView: null, 

  about: Yvi.MeAboutState.extend(),
  legal: Yvi.MeLegalState.extend(),
  settings: App.MeSettingsState.extend(),
  userStatus: Yvi.MeUserStatusState.extend(),
  editSettings: Yvi.MeEditSettingsState.extend()


});
