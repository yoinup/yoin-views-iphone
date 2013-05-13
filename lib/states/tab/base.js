
Yvi.TabBaseState = Em.State.extend({

  enter: function(sm) {
    this._super(sm);
    var tabPaneViewName = this.get('name');
    App.tabController.set('appTabView', tabPaneViewName );
  },

  closeMenu: function(sm) {
    App.uiManager.initAsyncEvent();
    this._closeMenu();
  }, 

  goToVenues: function(sm) {
    App.uiManager.initAsyncEvent();
    this._closeMenu();
    sm.goToState('venues');
  }, 

  goToWallet: function(sm) {
    App.uiManager.initAsyncEvent();
    this._closeMenu();
    sm.goToState('wallet');
  }, 

  goToNotifications: function(sm) {
    App.uiManager.initAsyncEvent();
    this._closeMenu();
    sm.goToState('notifications');
  },

  goToSettings: function(sm) {
    App.uiManager.initAsyncEvent();
    this._closeMenu();
    sm.goToState('settings');
  },

  _closeMenu: function() {
    App.asideController.changeMenu(false);
  }

});
