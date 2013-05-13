Yvi.MenuOptionView = Em.View.extend(Yn.Btap, {
  icon: null,
  text: null,
  classNames: [ 'menu-option', 'list-li-menu', 'three-column-table'],
  templateName: 'menu_option'
});

Yvi.MenuScreenView = Yvi.ScreenView.extend(Yn.ContextManager, {
	elementId: 'menu-screen',
  classNames: ['is-menu-bg'],
  homeCounter: null,
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
