Yvi.NavigationView = Yn.NavigationView.extend({

  init: function() {
    this._super();

    this.isEndAsyncEventDisabled = false;
    var self = this;
    this.on('willNavigate', function() {

    });

    this.on('didNavigateForward', function() {

      if ( this.get('childViews.length') !== 1 ) {
        App.uiManager.endAsyncEvent();
      }

    });

    this.on('didNavigateBackward', function() {

      if ( !self.isEndAsyncEventDisabled ) {
        App.uiManager.endAsyncEvent();
      }
    });

  }

});
