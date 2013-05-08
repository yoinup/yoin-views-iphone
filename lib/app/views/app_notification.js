
App.AppNotificationView = Em.View.extend({
  classNames: ['app-notification'],

  notificationTypeBinding: Em.Binding.oneWay('App.notificationController.type'),
  notificationContentBinding: Em.Binding.oneWay('App.notificationController.content'),
  notificationIsVisibleBinding: 'App.notificationController.isVisible',
  templateName: 'app_notification'

});
