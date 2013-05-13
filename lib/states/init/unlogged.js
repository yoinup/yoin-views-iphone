
Yvi.InitUnloggedState = Yvi.InitBaseState.extend( Yn.UserLogin, {

	view: null,

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
            Ember.run.schedule('afterRender', function() {
							self.set('isHidden', false);
						});
					}
				});

				this.view.on('transitionShow', function() {
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
