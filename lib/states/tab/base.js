
Yvi.TabBaseState = Em.State.extend({

  enter: function(sm) {
    this._super(sm);
    var tabPaneViewName = this.get('name');
    App.tabController.set('appTabView', tabPaneViewName );
  },

  closeMenu: function(sm) {
    App.uiManager.initAsyncEvent();
		App.asideController.set('menu', false);
  }, 

  goToVenues: function(sm) {
    App.uiManager.initAsyncEvent();
		App.asideController.set('menu', false);
    sm.goToState('venues');
  }, 

  goToWallet: function(sm) {
    App.uiManager.initAsyncEvent();
		App.asideController.set('menu', false);
    sm.goToState('wallet');
  }, 

  goToNotifications: function(sm) {
    App.uiManager.initAsyncEvent();
		App.asideController.set('menu', false);
    sm.goToState('notifications');
  },

  goToSettings: function(sm) {
    App.uiManager.initAsyncEvent();
		App.asideController.set('menu', false);
    sm.goToState('settings');
  }

});
