
Yvi.ScreenView = Em.View.extend({

  classNames: ['screen'],

  init: function() {

    var elementId = this.get('elementId');
    this.set('templateName', elementId );

    this._super();

  }

});
