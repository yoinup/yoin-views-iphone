Yvi.NavigationView = Yn.NavigationView.extend({

  init: function() {
    this._super();

    this.on('willNavigate', function() {

    });

    this.on('didNavigateForward', function() {

      if ( this.get('childViews.length') !== 1 ) {
        App.uiManager.endAsyncEvent();
      }

    });

    this.on('didNavigateBackward', function() {
      App.uiManager.endAsyncEvent();
    });

  }

});
