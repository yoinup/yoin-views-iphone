App.NotificationsManager = Yvi.StateManager.extend({
  
  instanceName: 'App.notificationsManager',
  enableLogging: false,
	logName: 'Notifications',

  initialState: 'notifications',

  closed: Yvi.NotificationsClosedState.extend(),
  notifications: Yvi.NotificationsNotificationsState.extend(),
  scanInvitation: Yvi.ScanInvitationState.extend(),
  map: Yvi.MapState.extend(),
  invitation: Yvi.InvitationState.extend(),
  terms: Yvi.TermsState.extend()

});
