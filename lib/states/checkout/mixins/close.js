Yvi.CheckoutClose = Em.Mixin.create({

  close: function(sm) {

		App.uiManager.initAsyncEvent();
    this._closeModalView(sm, true);

  },

  // clean controller, close modal view, reset NavigationView and move to close state
  _closeModalView: function(sm, shouldClearInviteController, next ) {

    var modalView = Em.View.views['checkout-modal'];
    modalView.one('transitionHide', function() {
      var navigationView = sm.get('navigationView');
      navigationView.popToRootView( function() {

        sm.goToState('closed');
        if ( shouldClearInviteController ) {
          App.inviteController.clear();
        }
        if ( !!next ) { 
          next();
        }

      });
    });

    Em.run.next(function() {
      App.modalController.set('checkoutHidden', true);
    });

  }

});
