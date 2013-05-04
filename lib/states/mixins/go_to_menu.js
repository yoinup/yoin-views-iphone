Yvi.GoToMenu = Em.Mixin.create({
	
  goToMenu: function(sm) {
    App.uiManager.initAsyncEvent();
    App.contentController.set('wallet', true);
    App.contentController.set('settings', true);
		App.asideController.set('menu', true);
  }

});
