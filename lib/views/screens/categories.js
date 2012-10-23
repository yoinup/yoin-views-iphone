
Yvi.CategoryItemOptions = {
  all: 'all',
  top: 'top'
};

Yvi.CategoryItemView = Em.View.extend(Yn.Btap, {

	classNameBindings: ['isBlue', 'isGreen', 'isPurple', 'isBrown', 'isSkyBlue'],
  classNames: ['category-item'],

  isBlue: Em.computed(function() {
    return this.getPath('content.icon') === 'n';
  }).property('content.icon'),

  isGreen: Em.computed(function() {
    return this.getPath('content.icon') === 'v';
  }).property('content.icon'),

  isPurple: Em.computed(function() {
    return this.getPath('content.icon') === 'c';
  }).property('content.icon'),

  isBrown: Em.computed(function() {
    return this.getPath('content.icon') === 'b';
  }).property('content.icon'),

  isSkyBlue: Em.computed(function() {
    return this.getPath('content.icon') === 's';
  }).property('content.icon'),

  name: null,
  option: null,

  action: 'selectCategory',
  actionContent: Em.computed(function() {
    return this.get('content') || this.get('option');
  }).property('content', 'option'),

  showName: Em.computed(function() {
    return this.getPath('content.name') || this.get('name');
  }).property('content.name', 'name'),

  showIcon: Em.computed(function() {
    return this.getPath('content.icon') || this.get('icon');
  }).property('content.icon', 'icon'),

  templateName: 'category_item' 

});

Yvi.CategoriesScreenView = Yvi.ScreenView.extend(Yn.Modal, {
  elementId: 'categories_screen',
  categories: null

});
