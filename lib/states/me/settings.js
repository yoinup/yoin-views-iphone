
Yvi.MeSettingsState = Em.State.extend(Yvi.GoToMenu, Yn.UpdateUser, Yn.FbAuth, {

	enter: function(sm) {

		this._super(sm);
		var tabPaneViewName = this.get('name');
		App.tabController.set('meTabView', tabPaneViewName );

	},

  closeSession: function(sm) {
    App.uiManager.initAsyncEvent();
    this._closeSession();
  },

  _closeSession: function(sm) {

    App.localStore.del(App.localStoreKeys.loginCredential, function(key) {
      Yn.User.logout();

      App.loginUserController.set('content', null);
      App.walletController.set('content', null );
      App.sentWalletController.set('content', null );

      App.facebookUserController.set('content', null);
      App.friendsController.set('content', null );
      App.buttonController.set('checkin', false);
      App.inviteController.clear();

      App.removeRealNotifications();

      App.initManager.goToState('unlogged');
    }, function() {
      // fatal error
    });

		App.localStore.del(App.localStoreKeys.privacySetting, function(key) {
		});

    if ( App.isNative ) {
      // authorizationToken + geofencing
      this._closeNativeSession();
    }

  },


  goToAbout: function(sm) {

    App.uiManager.initAsyncEvent();
		sm.goToState('about');

  },

  goToUserStatus: function(sm) {

    App.uiManager.initAsyncEvent();
		sm.goToState('userStatus');

  },

  goToEditSettings: function(sm) {

    App.uiManager.initAsyncEvent();
		sm.goToState('editSettings');

  },

  changePrivacy: function(sm, value) {

    if ( value ) {
      this._checkin();
    } else {
      this._checkout();
    }

  },

	_checkin: function(sm) {

    var fn = function() {
      App.localStore.set(App.localStoreKeys.privacySetting, {value: '1'}, function(key){ 
        App.notificationController.show('message_visible');
        App.buttonController.set('checkin', true);
        App.uiManager.endAsyncEvent();
      }, function() {  
        App.notificationController.error();
        App.uiManager.endAsyncEvent();
      });
    };
    

    App.uiManager.initAsyncEvent();
    this._startMonitoring(sm);

	},

	_checkout: function(sm) {

    var fn = function() {

				App.localStore.set(App.localStoreKeys.privacySetting, {value: '0'}, function(key){ 

					var checkins = App.store.find(Yn.Checkin, {});
					checkins.one('didLoad', function() {

						if (checkins.get('length') > 0 ) {
							var checkin = checkins.get('firstObject');
							checkin.deleteRecord();

							App.notificationController.show('message_invisible');
							checkin.on('didDelete', function(item) {
								App.uiManager.endAsyncEvent();
							});

							checkin.on('didDeleteError', function(item) {
								App.buttonController.set('checkin', true);
								App.uiManager.endAsyncEvent();
								App.notificationController.error();
							});

							App.buttonController.set('checkin', false);
							App.store.commit();
						} else {
              App.uiManager.endAsyncEvent();
            }

					});

				}, function(error) {

          App.uiManager.endAsyncEvent();
					console.log('setKey error \n' + error);

				});

    };


    App.uiManager.initAsyncEvent();
    this._stopMonitoring(sm, fn);

	},
	
	deleteAccount: function(sm) {

    var self = this;

    var fn = function() {
      var user = App.loginUserController.get('content');
			user.deleteRecord();
			user.on('didDelete', function(item) {
        self._closeSession();
			});
			user.on('didDeleteError', function(item) {
				App.notificationController.error();
        App.uiManager.endAsyncEvent();
			});
			App.store.commit();
    };

    App.uiManager.initAsyncEvent();
    if ( App.isNative ) {

      navigator.notification.confirm( I18n.t('delete_account_confirm'), function(confirm) {
        if ( confirm === 1) {
          fn();
        } else {
          App.uiManager.endAsyncEvent();
        }
      });

    } else {
      fn();
    }

	}

});
