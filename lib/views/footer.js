
Yvi.FooterOptionView = Yvi.IconTabOptionView.extend({

  //manager: 'App.tabManager',
	manager: null,

  classNames: ['tabs-bottom', 'footer-icon'],
	currentTabView: null

});



Yvi.FooterView = Em.View.extend({
	
  elementId: 'footer',

	classNames: ['l-footer'],
	
  manager: null,

	currentTabView: null,
	
	templateName: 'footer'

});
/*

<!--{{#view Em.View id="footer" class="l-footer" }}
	
		{{view Yvi.FooterOptionView id="left-tab" class="is-icon-big" 
			tab="venues" 
			icon="q"
			currentTabViewBinding="App.tabController.appTabView"}}
		
	
		{{view Yvi.FooterOptionView id="right-tab" class="is-icon-big"
			tab="me" 
			icon="p"
			currentTabViewBinding="App.tabController.appTabView"}}
	
	<div id="footer-middle">
	
		{{view Yvi.FooterOptionView id="inner-footer-middle" class="is-icon-x-big"
			tab="qr" 
			icon="E"
			currentTabViewBinding="App.tabController.appTabView"}}
		
	</div>	

{{/view}}-->
*/