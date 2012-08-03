
App.ScreenView = Em.View.extend({

  classNames: ['screen'],

  init: function() {

    /*
    var elementId = Ember.meta(this).proto['constructor'].superclass.toString();
    elementId = elementId.toString().replace('App.','');
    elementId = elementId.toString().replace('View','');

    elementId = Ember.String.underscore(elementId);
    this.elementId = elementId;

    //this.set('elementId', elementId);
    */

    var elementId = this.get('elementId');
    this.set('templateName', elementId );

    this._super();

  }

});
