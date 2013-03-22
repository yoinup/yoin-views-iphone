
Yvi.CheckoutEnterChoose = Em.Mixin.create({

  enterChoose: function(sm) {

    var closed = App.modalController.get('checkoutHidden');
    if ( closed ) {
      var view = this.get('navigatedView');
      var navigationView = sm.get('navigationView');

      navigationView.pushView( view, 'invite', function() {
        App.modalController.set('checkoutHidden', false);
      }, false);

    } else {
      this.moveForward(sm);
    }

  }

});
