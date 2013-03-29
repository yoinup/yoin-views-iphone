Yvi.GoToMenu = Em.Mixin.create({
	
  goToMenu: function(sm) {
    App.uiManager.initAsyncEvent();
		App.asideController.set('menu', true);
  }

});
