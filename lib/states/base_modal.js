
Yvi.BaseModalState = Em.State.extend({

  backState: '',
  viewName: null,

  view: Em.computed(function(){
    return Em.get( this.get('viewName') );
  }).property(),

  enter: function(sm) {
    this._super(sm);
    this.backState = sm.get('currentState').get('name');
  },

  close: function(sm) {
    App.uiManager.initAsyncEvent();
    sm.goToState(this.backState);
  },

  exit: function(sm) {

    this.get('view').set('isHidden', true);
    this._super(sm);

  }

});
