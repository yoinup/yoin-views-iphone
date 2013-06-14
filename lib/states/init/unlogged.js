
Yvi.InitUnloggedState = Yvi.InitBaseState.extend( Yn.UserLogin, {

	view: null,

  close: function(sm) {

    App.applicationController.set('loginType', Yvi.LoginScreenType.fbLogin);

  },

  goToRegisterUsingEmail: function(sm) {
    App.applicationController.set('loginType', Yvi.LoginScreenType.emailRegister);
  },

  goToLoginUsingEmail: function(sm) {
    App.applicationController.set('loginType', Yvi.LoginScreenType.emailLogin);
  },

  goToResetPassword: function(sm) {
    App.applicationController.set('loginType', Yvi.LoginScreenType.passwordReset);
  },

  loginWithEmail: function(sm, params) {

    var credential = {type: Yn.UserLoginType.email,
                      email: params.email,
                      password: params.password};

		App.uiManager.initAsyncEvent();
		var self = this;
    this.loginUser(credential, function(user) {
			self._loginUserCallback(sm, user, credential);
    });

  },

  registerWithEmail: function(sm, params) {

    var credential = {type: Yn.UserLoginType.email,
                      email: params.email,
                      password: params.password};

		App.uiManager.initAsyncEvent();
		var self = this;
    Yn.User.register(credential, function(user) {
      // registeredUser has not sideLoading
      self._loginUserCallback(sm, user, credential);
    }, function(error) {
      App.notificationController.error();
      App.uiManager.endAsyncEvent();
    });

  },

  resetPassword: function(sm, params) {

		App.uiManager.initAsyncEvent();
    App.applicationController.set('resetEmail', params.email);
		var self = this;
    Yn.User.resetPassword(params, "POST", function(response) {
      App.applicationController.set('loginType', Yvi.LoginScreenType.passwordChange);
      App.uiManager.endAsyncEvent();
    }, function(response) {
      App.notificationController.error();
      App.uiManager.endAsyncEvent();
    });

  },

  renewPassword: function(sm, params) {

    var email = App.applicationController.get('resetEmail');

    var renewParams = {email: email,
                       password: params.password,
                       confirmation_code: params.code};

		App.uiManager.initAsyncEvent();
		var self = this;
    Yn.User.resetPassword(renewParams, "PUT", function(response) {

      var credential = {type: Yn.UserLoginType.email,
                        email: email,
                        password: params.password};

      self.loginUser(credential, function(user) {
        self._loginUserCallback(sm, user, credential);
      });

    }, function(response) {
      App.notificationController.error();
      App.uiManager.endAsyncEvent();
    });

  },

	enter: function(sm) {

    this._super.apply(this, arguments);
		var self = this;

		// in order the animations can work
		// not on startup: show the view after being inserted
		if ( !sm.get('currentState') ) {

				this.view = App.LoginScreenView.create({
					isHidden: false,
					doInserting: function() {
						if ( App.isNative ) {

              Ember.run.schedule('afterRender', function() {
								navigator.splashscreen.hide();
							});

						}
					}
				});

		} else {

				this.view = App.LoginScreenView.create({
					isHidden: true,
					doInserting: function() {
						var self = this;
            Ember.run.next(function() {
							self.set('isHidden', false);
						});
					}
				});


				this.view.on('transitionShow', function() {

          // from closeSession
					App.appContainerView.destroy();
					App.appContainerView = null;
				});

		}


		this.view.on('transitionHide', function() {
			this.destroy();
		});

		App.appendToRoot(this.view);

	},

	exit: function(sm) {


		var self = this; 

		this.insertAppView(sm, false, function() {
      App.applicationController.set('loginType', Yvi.LoginScreenType.fbLogin);
			self.view.set('isHidden', true);
		});

		this._super(sm);

	},


	loginWithFb: function(sm) {

		App.uiManager.initAsyncEvent();
		var self = this;
		this.loginFbUser(function(user, credential) {

			self._loginUserCallback(sm, user, credential);

		});

	},

	// if user goToState log
	// otherwise endAsyncEvent
	_loginUserCallback: function(sm, user, credential) {

		if ( !!user ) {

      App._sideloadingInitData(user);
      App.geopositionController.refreshPosition();
      App.userDidLogin(user, credential);
			this._loggedUserNext(sm, user);
		} else {
      App.notificationController.show('notification_login_false', Yn.NotificationViewType.warning);
			App.uiManager.endAsyncEvent();
		}

	},


	_loggedUserNext: function(sm, user) {

		if ( user.get('isActive') ) {
			sm.goToState('logged');
		} else {

      var text = I18n.t('notification_login_inactive'),
          title = I18n.t('popup_title');        
      navigator.notification.alert( text, function(){}, title);
      
			App.uiManager.endAsyncEvent();
		}

	}

});
