
App.CategoriesScreenView = Yvi.CategoriesScreenView.extend( Yvi.Modal, {
  manager: 'App.venuesManager',

  categoriesBinding: Em.Binding.oneWay('App.categoryController.selectables'),
  isHiddenBinding: Em.Binding.oneWay('App.modalController.categoriesHidden'),

  init: function() {
    this._super();
    this._categoriesChanged();

  },


  _categoriesChanged: Em.observer(function() {

    var categories = this.get('categories'),
        self = this;

    if ( !!categories ) {
      var result = categories.filter( function(item) {
        return item.get('subcategory') !== 1; 
      });
      result.set('isLoaded', true);

      self.set('orderCategories', result);
    }


  }, 'categories')

});
