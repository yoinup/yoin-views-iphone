
// TODO: on transitionEnd/Hide executes the uiManager.endAsyncEvent
// remove this logic on flipViewEvents
App.LoginScreenView = Yvi.LoginScreenView.extend(Yn.Context, Yvi.Modal, {
  classNames: ['from-up'],

  isBlockedBinding: Em.Binding.oneWay('App.uiManager.isBlocked'),
  hasConnectionBinding: Em.Binding.oneWay('App.applicationController.hasConnection'),

	isHidden: false,

  init: function () {
    this._super();
    var self = this;
    this.on('didInsertElement', function() {
      self.doInserting();
    });
  },

  doInserting: Em.K,

	manager: 'App.initManager'

});
