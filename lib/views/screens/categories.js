
Yvi.CategoryItemOptions = {
  all: 'all',
  top: 'top'
};

Yvi.CategoryItemView = Em.View.extend(Yn.Btap, {

  classNames: ['category-item'],

  name: null,
  option: null,

  action: 'selectCategory',
  actionContent: Em.computed(function() {
    return this.get('content') || this.get('option');
  }).property('content', 'option'),

  showName: Em.computed(function() {
    return this.get('content.name') || this.get('name');
  }).property('content.name', 'name'),

  showIcon: Em.computed(function() {
    return this.get('content.icon') || this.get('icon');
  }).property('content.icon', 'icon'),

  templateName: 'category_item' 

});

Yvi.CategoriesScreenView = Yvi.ScreenView.extend(Yn.Modal, {
  elementId: 'categories_screen',
	withoutFooter: true,
	setMinHeight: false,
  freeCategory: null,
  orderCategories: null

});
