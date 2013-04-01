
Yvi.MeAboutState = Yvi.BaseNavigatedState.extend({

  goToPrivacy: function(sm) {
    App.uiManager.initAsyncEvent();
    App.legalScreenView.set('isPrivacy', true);
    sm.goToState('legal');
  },

  goToTerms: function(sm) {
    App.uiManager.initAsyncEvent();
    App.legalScreenView.set('isPrivacy', false);
    sm.goToState('legal');
  }

});
