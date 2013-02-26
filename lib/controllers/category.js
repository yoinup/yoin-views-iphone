
Yvi.CategoryController = Em.ArrayController.extend({
  selected: null,
  selectables: [],

  _contentChanged: Ember.observer(function() {

    var self = this,
        content = this.get('content');


    var categories = content.filter( function(item) {
      return item.get('subcategory') !== 2; 
    });
    self.set('selectables', categories );


  }, 'content' )

});
