Yvi.ChooseProductOption = {
	all: 'all',
	nears: 'nears'
};


Yvi.ChooseProductMenuTabsView = Yn.MenuTabsButtonView.extend({
	
	content: Em.A([ {'name': Yvi.ChooseProductOption.all, 'action': Yvi.ChooseProductOption.all}, 
									{'name': Yvi.ChooseProductOption.nears, 'action': Yvi.ChooseProductOption.nears} ]),
	
	selected: null
	
});


Yvi.ChooseProductCategoryButtonView = Em.View.extend( Yn.Btap, Yn.Icon, Yn.IsSelected, {

	iconBinding: Em.Binding.oneWay('content.icon'),

	action: 'selectCategory',

  actionContentBinding: Em.Binding.oneWay('content')

});


Yvi.ChooseProductScreenView = Yvi.ScreenView.extend({
  elementId: 'choose_product_screen',

  user: null,
	categories: null,
	selectedCategory: null,

	option: null,

  allContent: null,
  nearsContent: null,


	isAllContentLoaded: Em.computed(function() {
		return !!this.get('allContent');
	}).property('allContent'),

	isNearsContentLoaded: Em.computed(function() {
		return !!this.get('nearsContent');
	}).property('nearsContent')
  
});












