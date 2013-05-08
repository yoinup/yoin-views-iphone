
App.VenuesScreenView = Yvi.VenuesScreenView.extend({

  manager: 'App.venuesManager',
  gestureDelegate: App.menuGestureDelegate,

	contentBinding: Em.Binding.oneWay('App.venuesController.content'),
	hasNextBinding: Em.Binding.oneWay('App.venuesController.hasNext'),
	isRefreshedBinding: Em.Binding.oneWay('App.venuesController.isRefreshed'),

  selectedCityBinding: Em.Binding.oneWay('App.cityController.selected'),

  loggedUserBinding: Em.Binding.oneWay('App.loginUserController.content'),
  isGeopositionOnBinding: Em.Binding.oneWay('App.geopositionController.isOn'),

  userBinding: Em.Binding.oneWay('App.inviteController.user'),
  facebookUserBinding: Em.Binding.oneWay('App.inviteController.facebookUser'),
  agendaUserBinding: Em.Binding.oneWay('App.inviteController.agendaUser'),
  usernameBinding: Em.Binding.oneWay('App.inviteController.username'),

  friendsBinding: Em.Binding.oneWay('App.friendsController.content'),
  newFriendsBinding: Em.Binding.oneWay('App.friendsController.newFriends'),

  notificationsCounterBinding: Em.Binding.oneWay('App.notificationsController.isPendingCounter')

});
