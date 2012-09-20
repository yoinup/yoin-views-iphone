
Yvi.ScreenView = Em.View.extend(Yn.Context, {

  classNames: ['screen'],

  //Used in order to display notification messages in Screens
  isNotification: null,
  notificationMessage: null,
  notificationType: null,


  init: function() {

    var elementId = this.get('elementId');
    this.set('templateName', elementId );

    this._super();

  }

});
