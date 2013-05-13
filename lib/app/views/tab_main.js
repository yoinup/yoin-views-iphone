App.TabMainView = Yn.TabMainView.extend(Yn.AsideFrontSection, {

  manager: 'App.tabManager',
  gestureDelegate: App.menuGestureDelegate,
  currentTabViewBinding: Em.Binding.oneWay('App.tabController.appTabView'),
  action: 'closeMenu',

  swipeOptions: {
    direction: Em.OneGestureDirection.Left,
    cancelPeriod: 100,
    swipeThreshold: 20
  },

  swipeEnd: function() {

    this.triggerEvent(this.get('action'));

  }

});
