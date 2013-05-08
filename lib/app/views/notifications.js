
App.NotificationsView = Em.ContainerView.extend(Yn.Context, Yvi.Modal, {
  isHiddenBinding: Em.Binding.oneWay('App.modalController.notificationsHidden'),
	manager: 'App.notificationsManager',

  childViews: ['child'],
  child: Yvi.NavigationView.extend({
    pushIsAnimated: true,
    elementId: 'notifications-navigation',
    initViewClass: 'App.NotificationsScreenView'

  })

});
