Yvi.ChooseUserFriendsState = Em.State.extend(Yn.UpdateUser, Yn.FbAuth, {

  enter: function(sm) {
    this._super(sm);
    this._initChooseUser();
    App.modalController.set('chooseUserHidden', false);
  },

  _initChooseUser: function(sm) {

		if ( !this.isInit ) {

      var hasNewFriends = App.friendsController.get('hasNewFriends');
			var option = ( hasNewFriends ) ? Yvi.ChooseUserOption.yoin : Yvi.ChooseUserOption.facebook;
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

    var c = App.tabController;

		var currentOption = c.get('chooseUser');
		c.set('chooseUserOld', currentOption);
		c.set('chooseUser', option);

    if ( option === Yvi.ChooseUserOption.contacts ) {
      this._pickContact(sm);
    }


	},

	selectUser: function(sm, user) {

    App.uiManager.initAsyncEvent();

    App.inviteController.clearUsers();
    App.inviteController.set('user', user);

    sm.goToState('closed');

	},

  _pickContact: function(sm) {

    if ( App.isNative ) {

      var self = this;

      if ( App.isAndroid ) {

        window.plugins.contactViewPlugin.show(function(contact) {

          if ( !!contact ) {
            self._selectAgendaUser(sm, contact);
          }

          var c = App.tabController;
          var option = c.get('chooseUserOld');
          c.set('chooseUser', option);

        }, function(error) {
          console.log( error);

          var c = App.tabController;
          var option = c.get('chooseUserOld');
          c.set('chooseUser', option);
        });

      } else {

        var options = new ContactFindOptions();
        options.fields = ["displayName", "name", "emails", "phoneNumbers"];

        navigator.contacts.chooseContact(function(id, fullContact){


          if ( id > -1  ) {

            console.log(fullContact);

            var contact = {},
                name = fullContact.name,
                emails = fullContact.emails,
                phones = fullContact.phoneNumbers,
                email,
                phone;

            if ( !!name ) {
              name = name.formatted;
            }

            if ( !!phones && phones.length > 0 ) {
              phone = phones[0].value;
            }

            if ( !!emails && emails.length > 0 ) {
              email = emails[0].value;
            }

            contact.name = name;
            contact.email = email;
            contact.phone = phone;

            self._selectAgendaUser(sm, contact);

          } else {
            console.log('push contact');
          }

          var c = App.tabController;
          var option = c.get('chooseUserOld');
          c.set('chooseUser', option);

        }, options); 

      }
    }

  },

  _selectAgendaUser: function(sm, user) {

    App.uiManager.initAsyncEvent();
    App.inviteController.clearUsers();
    App.inviteController.set('agendaUser', user);
    sm.goToState('closed');

  },

	selectFacebookUser: function(sm, user) {

    App.uiManager.initAsyncEvent();
    App.inviteController.clearUsers();
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
