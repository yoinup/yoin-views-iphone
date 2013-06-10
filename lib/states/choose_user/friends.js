
Yvi.ChooseUserFriendsState = Em.State.extend(Yn.UpdateUser, Yn.FbAuth, {

  enter: function(sm) {
    this._super(sm);

    this._initChooseUser();
    App.modalController.set('chooseUserHidden', false);

  },

  _initChooseUser: function(sm) {

		if ( !this.isInit ) {

      var hasNewFriends = App.friendsController.get('hasNewFriends');
			var option = ( hasNewFriends ) ? Yvi.ChooseUserOption.yoin : Yvi.ChooseUserOption.facebook ;
			App.tabController.set('chooseUser', option);

      if ( hasNewFriends ) {
        this.updateNewFriends();
      }

			this.isInit = true;
		}

  },

  updateNewFriends: function() {

    // TODO: batch operation
    var newFriends = App.friendsController.get('newFriends');

    newFriends.forEach(function(item) {
      item.set('isNew', false);
    });
    App.store.commit();

  },

  exit: function(sm) {

    App.modalController.set('chooseUserHidden', true);
    this._super(sm);

  },

  close: function(sm) {
    App.uiManager.initAsyncEvent();
    sm.goToState('closed');
  },

	tabFire: function(sm, option) {

		App.tabController.set('chooseUser', option);

	},

	selectUser: function(sm, user) {

    App.uiManager.initAsyncEvent();
    App.inviteController.set('user', user);
    App.inviteController.set('facebookUser', null);

    sm.goToState('closed');

	},

  pickContact: function() {

    if ( App.isNative ) {

      if ( App.isAndroid ) {

        window.plugins.contactViewPlugin.show(function(contact) {
          console.log('contact---> ');
          console.log(contact.name);
          console.log(contact.email);
          console.log(contact.phone);
        }, function(error) {
          console.log( error);
        });

      } else {
        var options = new ContactFindOptions();
        options.fields = ["displayName", "name", "emails", "phoneNumbers"];

        navigator.contacts.chooseContact(function(contact){
          console.log('---> ', contact);
        }, options); 

      }
    }

  },

	selectFacebookUser: function(sm, user) {

    App.uiManager.initAsyncEvent();
    App.inviteController.set('user', null);
    App.inviteController.set('facebookUser', user);

    sm.goToState('closed');

	},

  connectWithFacebook: function(sm) {

    App.uiManager.initAsyncEvent();
    var user = App.loginUserController.get('content'),
        self = this;
    
    this.authFb(function(authResponse) {

				if (!!authResponse ) {

          var fbChannel = Yn.FbChannel.createRecord({
						fbId: authResponse.userID,
						accessToken: authResponse.accessToken 
          });

          fbChannel.on('didCreate', function(item) {

            var refreshController = function() {
              Em.removeObserver(user, 'data', refreshController);
              App.facebookUserController.refresh();
            };

            Em.addObserver(user, 'data', refreshController);
            self.refreshUser();
            App.uiManager.endAsyncEvent();
          });
          fbChannel.on('didCreateError', function(item) {
            App.notificationController.error();
            App.uiManager.endAsyncEvent();
          });
          App.store.commit();

				} else {
          App.notificationController.error();
          App.uiManager.endAsyncEvent();
				}

    });

  }

});
