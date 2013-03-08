
// TODO: move to yoin-views

// on transitionEnd/Hide executes the uiManager.endAsyncEvent
Yvi.Modal = Em.Mixin.create(Yn.Modal, {

  init: function() {

    this._super();

    this.on('transitionShow', function() {
      App.uiManager.endAsyncEvent();
    });

    this.on('transitionHide', function() {
      App.uiManager.endAsyncEvent();
    });

  }

});


// on transitionHide event trigger the willRemove event in order its parentViewContainer
// can remove this childView
Yvi.PrerenderModal = Em.Mixin.create(Yvi.Modal, {

  isHidden: true,
  classNames: ['from-down'],

  init: function() {

    this._super();
    this.on('transitionHide', function() {
      this.trigger('willRemove');
    });

  }

});
