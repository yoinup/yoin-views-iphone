
Yvi.NavigationBackEvent = Em.Mixin.create({
	
  back: function(sm) {
    App.uiManager.initAsyncEvent();
    this.doBack(sm, true);
  },
  
  doBack: function(sm, animated) {

    if (animated === undefined ) {
      animated = true;
    }
    var view = sm.get('navigationView');
    view.popView(animated);
    sm.goToState( view.backState );
  }

});
