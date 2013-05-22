
App.NotificationsScreenView = Yvi.NotificationsScreenView.extend({

  manager: 'App.notificationsManager',

  gestureDelegate: App.menuGestureDelegate,
  loggedUserBinding: Em.Binding.oneWay('App.loginUserController.content'),
  notificationsBinding: Em.Binding.oneWay('App.notificationsController.content'),

	initContentBinding: Em.Binding.oneWay('App.contentController.notifications')

});
