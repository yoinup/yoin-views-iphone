

App.applicationController = Em.Object.create({

});

App.tabController = Em.Object.create({

  appTabView:null,
  meTabView: null,

	chooseUser: null,

  walletIsInbox: true

});

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



App.modalController = Em.Object.create({
  categoriesHidden: true,
  checkoutHidden: true,
  chooseUserHidden: true

});

App.inputsController = Em.Object.create({

  inviteComment: null,
  chooseUser: null,
  invitationComment: null,
  userStatus: null
});

App.buttonController = Em.Object.create({

  checkin: false

});

App.asideController = Em.Object.create({

  mapCities: false,
  menu: false

});
