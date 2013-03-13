Yvi.MenuOptionView = Em.View.extend(Yn.Btap, {
  icon: null,
  text: null,
  classNames: [ 'menu-option', 'list-li', 'three-column-table'],
  templateName: 'menu_option'
});

Yvi.MenuScreenView = Yvi.ScreenView.extend({
	elementId: 'menu-screen',
  classNames: ['is-flat-bg']

});
