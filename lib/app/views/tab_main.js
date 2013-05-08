App.TabMainView = Yn.TabMainView.extend(Yn.AsideFrontSection, {

  manager: 'App.tabManager',
  gestureDelegate: App.menuGestureDelegate,
  currentTabViewBinding: Em.Binding.oneWay('App.tabController.appTabView'),
  action: 'closeMenu'

});
