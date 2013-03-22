
var get = Em.get, fmt = Ember.String.fmt;

Yvi.StateManager = Em.StateManager.extend({

	logName: '',


  send: function(event, context) {

    var eventName = fmt("%@.%@.%@", [this.logName, get(this, 'currentState.name'), event]),
        value;

    if ( context && context instanceof DS.Model ) {
      var id = context.get('id');
      if ( !!id ) {
        value = id;
      }
    }

    // TODO it fails on class design
    App.analytics.logEvent(eventName, value);
    this._super(event, context);

  }

});
