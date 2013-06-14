

App.applicationController = Em.Object.create({
  hasConnection: true,
  loginType: Yvi.LoginScreenType.fbLogin 

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


App.contentController = Em.Object.create({
  chooseUser: false,
  settings: false,
  wallet: false,
  notifications: false
});


App.modalController = Em.Object.create({
  categoriesHidden: true,
  checkoutHidden: true,
  notificationsHidden: true,
  chooseUserHidden: true

});

App.inputsController = Em.Object.create({

  inviteComment: null,
  chooseUser: null,
  chooseUserDelayed: null,
  invitationComment: null,
  userStatus: null
});

App.buttonController = Em.Object.create({

  checkin: false

});

App.asideController = Em.Object.create({

  mapCities: false,
  menu: false,
  
  // to accelrate animation
  changeMenu: function(state) {
    
    var view$ = App.appContainerView.$();
    if ( state ) {
      view$.addClass('is-aside-left');
    } else {
      view$.removeClass('is-aside-left');
    }

    this.set('menu', state);
  }

});
