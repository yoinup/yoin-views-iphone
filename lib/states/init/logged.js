
Yvi.InitLoggedState = Yvi.InitBaseState.extend({

  enter: function(sm) {

    this._super(sm);
    
    if ( !sm.get('currentState') ) {

      this.insertAppView(sm, true);
    }


  },

  exit: function(sm) {
		

    this._super(sm);

  }

});
