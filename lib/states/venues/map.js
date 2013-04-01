
Yvi.VenuesMapState = Em.State.extend({

  enter: function(sm) {
    this._super(sm);
    this.backState = sm.get('currentState').get('name');
  },

  exit: function(sm) {

    App.mapScreenView.set('isHidden', true);
    this._super(sm);

  },

  close: function(sm) {
    App.uiManager.initAsyncEvent();
    sm.goToState(this.backState);
  }

});
