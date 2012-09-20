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

  content: null,
  

	optionIsAll: Em.computed(function() {

		return this.get('option') === Yvi.ChooseProductOption.all;

	}).property('option'),

	title: Em.computed(function() {

		return this.get('optionIsAll') ? this.getPath('selectedCategory.name') : I18n.t('nears') ;

	}).property('selectedCategory', 'categories', 'option'),
/*
	title: Em.computed(function() {
		return this.get('optionIsAll') ? I18n.t('choose_product_' + this.get('selectedCategory') ) : I18n.t('nears') ;
	}).property('selectedCategory', 'option'),
  */


  tabOption: Em.computed(function() {
		return this.get('optionIsAll') ? this.get('selectedCategory')  : 'nears';
	}).property('selectedCategory', 'option')

});
