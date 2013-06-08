
Yvi.MenuScreenView = Yvi.ScreenView.extend(Yn.ContextManager, {
	elementId: 'menu-screen',
  classNames: ['is-menu-bg'],
  invitationsCounter: null,


  swipeOptions: {
    direction: Em.OneGestureDirection.Left,
    cancelPeriod: 100,
    swipeThreshold: 20
  },

  action: 'closeMenu',


  swipeEnd: function() {

    this.triggerEvent(this.get('action'));

  }

});
