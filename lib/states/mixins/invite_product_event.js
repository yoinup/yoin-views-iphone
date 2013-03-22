Yvi.InviteProductEvent = Em.Mixin.create({
	
	// TODO: navigationView accessed via variable
  inviteProduct: function(sm, context) {
		
    App.uiManager.initAsyncEvent();

		App.inviteController.setProduct(context.product);
		App.inviteController.set('venue', context.venue);

    App.checkoutManager.send('goToInvite');

  }

});
