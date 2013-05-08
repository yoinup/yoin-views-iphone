App.ChooseUserManager = Yvi.StateManager.extend({

  instanceName: 'App.chooseUserManager',
  enableLogging: false,
	logName: 'ChooseUser',

  initialState: 'closed',

  friends: Yvi.ChooseUserFriendsState.extend(),
  closed: Yvi.ChooseUserClosedState.extend()

});
