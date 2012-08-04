
Yvi.FooterOptionView = Em.View.extend( Yvi.TabOption, Yn.Icon, {

  manager: 'App.tabManager',

  classNames: ['tabs_bottom', 'footer-icon'],
	currentTabViewBinding: Em.Binding.oneWay('App.tabController.appTabView')


});
