Yvi.ChooseProductOption = {
	all: 'all',
	nears: 'nears'
};


Yvi.ChooseProductScreenView = Yvi.ScreenView.extend({

  elementId: 'choose_product_screen',
  user: null,
	categories: null,
	selectedCategory: null,

	option: null,


	optionIsAll: Em.computed(function() {

		return this.get('option') === Yvi.ChooseProductOption.all;

	}).property('option'),

	selectedOptionTitle: Em.computed(function() {

		return this.get('optionIsAll') ? this.getPath('selectedCategory.name') : I18n.t('nears') ;

	}).property('selectedCategory', 'categories', 'option')

});
