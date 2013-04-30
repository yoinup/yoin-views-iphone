
Yvi.BaseNavigatedState = Em.State.extend(Yvi.NavigationBackEvent, {

  navigatedView: Em.computed(function() {
    return Em.get('App.' + this.get('name') + 'ScreenView');
  }).property().volatile(),

  enter: function(sm) {
    
    this._super(sm);
    this.moveForward(sm);

  },

  moveForward: function(sm) {
    var view = this.get('navigatedView');
    view.set('manager', sm.instanceName);
    var navigationView = sm.get('navigationView');

    // comes from back
    if ( !navigationView.get('childViews').contains(view) ) { 
      
      // pushIsAnimated is setup in states in some specific cases
      // value is restore to true when false
      var animated = navigationView.get('pushIsAnimated');
      navigationView.pushView( view, sm.get('currentState.name'), animated);
      if ( !animated ) {
        navigationView.set('pushIsAnimated', true);
      }

    }

  }

});
