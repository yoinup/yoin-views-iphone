
App.ChooseUserScreenView = Yvi.ChooseUserScreenView.extend( Yvi.Modal, {

  manager: 'App.chooseUserManager',

  isHiddenBinding: Em.Binding.oneWay('App.modalController.chooseUserHidden'),
  userBinding: Em.Binding.oneWay('App.loginUserController.content'),

  yoinContentBinding: Em.Binding.oneWay('App.friendsController.content'),
  facebookContentBinding: Em.Binding.oneWay('App.facebookUserController.content'),
  nearsContentBinding: Em.Binding.oneWay('App.nearUsersController.content'),

  optionBinding: Em.Binding.oneWay('App.tabController.chooseUser'),

	locationActiveBinding: Em.Binding.oneWay('App.buttonController.checkin'),

	searchInputBinding: "App.inputsController.chooseUser",
	searchInputDelayedBinding: "App.inputsController.chooseUserDelayed",

	initContentBinding: Em.Binding.oneWay('App.contentController.chooseUser'),

	showNears: true

});
