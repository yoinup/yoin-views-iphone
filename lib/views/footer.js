
App.FooterOptionView = Em.View.extend( App.TabOption, Yn.Icon, {

  manager: 'App.tabManager',

	id: null,

  classNames: ['tabs_bottom', 'footer-icon'],
	currentTabViewBinding: Em.Binding.oneWay('App.tabController.appTabView')


});
