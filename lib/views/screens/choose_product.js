Yvi.ChooseProductOption = {
	all: 'all',
	nears: 'nears'
};

Yvi.ChooseProductMenuTabsView = Yn.MenuTabsButtonView.extend({
	
	content: Em.A([ {'name': Yvi.ChooseProductOption.all, 'action': Yvi.ChooseProductOption.all}, 
									{'name': Yvi.ChooseProductOption.nears, 'action': Yvi.ChooseProductOption.nears} ]),
	
	selected: Yvi.ChooseProductOption.all
	
})


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

	}).property('selectedCategory', 'categories', 'option')

});
