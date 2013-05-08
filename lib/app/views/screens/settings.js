
App.SettingsScreenView = Yvi.SettingsScreenView.extend({

  manager: 'App.meManager',
  gestureDelegate: App.menuGestureDelegate,

  userBinding: Em.Binding.oneWay('App.loginUserController.content'),
  hasFacebookBinding: 'App.loginUserController.hasFacebook',
  isCheckinOnBinding: 'App.buttonController.checkin',
  currentTabViewBinding: Em.Binding.oneWay('App.tabController.meTabView'),

	initContentBinding: Em.Binding.oneWay('App.contentController.settings')

});
