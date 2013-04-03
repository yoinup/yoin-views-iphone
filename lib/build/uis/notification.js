App.notificationController = Em.Object.create({
  type: null,
  content: null,
  isVisible: false,


  show: function(content, type) {

    if ( type === undefined ) {
      type = Yn.NotificationViewType.info;
    }
    this.set('type', type);
    this.set('content', I18n.t(content) );
    this.set('isVisible', true);

  },

  error: function() {
    this.show( 'message_generic_error', Yn.NotificationViewType.error);
  }

});

/*Yn.NotificationViewType.warning
 *Yn.NotificationViewType.error
 *Yn.NotificationViewType.info
*/
