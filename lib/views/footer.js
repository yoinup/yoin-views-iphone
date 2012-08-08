
Yvi.FooterOptionView = Yvi.IconTabOptionView.extend({

  //manager: 'App.tabManager',
	manager: null,

  classNames: ['tabs-bottom', 'footer-icon'],
	currentTabView: null

});



Yvi.FooterView = Em.View.extend({
	
  elementId: 'footer',

	classNames: ['l-footer'],
	
  manager: null, //'App.tabManager',

	currentTabView: null,
	
	templateName: 'footer'

});
