Yvi.CheckoutInviteState = Em.State.extend(Yn.UpdateUser, Yvi.CheckoutClose, {

  enter: function(sm){

    var closed = App.modalController.get('checkoutHidden');
    if ( closed ) {
      App.modalController.set('checkoutHidden', false);
    }

  },

	changeUser: function(sm) {
    this._goToChooseUser(sm);
	},

	goToChooseUser: function(sm) {
    this._goToChooseUser(sm);
	},

	goToChooseProduct: function(sm) {

    App.tabManager.goToState('venues');
    if ( App.venuesManager.get('currentState.name') === 'friendsNearby' ) {
      
      // TODO improvement
      var view = App.venuesManager.get('navigationView');
      view.isEndAsyncEventDisabled = true;
      view.popView(false);
      App.venuesManager.goToState( view.backState );
      view.isEndAsyncEventDisabled = false;
    }
    this._goToChooseProduct(sm);
	},


	goToMap: function(sm, venue) {

    App.uiManager.initAsyncEvent();
		App.mapScreenView.setProperties({ '_withHeaderAction': false,
                                      'venue': venue, 
                                      'showVenue': true, 
                                      'manager': sm });
		App.appendToRoot(App.mapScreenView);
		sm.goToState('map');

	},


	changeProduct: function(sm) {
    this._goToChooseProduct(sm);
	},

  _goToChooseProduct: function(sm) {
		App.uiManager.initAsyncEvent();
    this._closeModalView(sm, false);
  },

  _goToChooseUser: function(sm) {
    App.uiManager.initAsyncEvent();
    App.chooseUserManager.goToState('friends');
  },

	selectVenue: function(sm, venue) {
    App.inviteController.set('venue', venue);
    App.inviteController.set('venues', null);
	},

	meetSomeone: function(sm) {

		var product = App.inviteController.get('product'),
        text,
        title,
        i18nMessage,
        invitation = App.inviteController.get('invitation'),
        venue = App.inviteController.get('venue');

    if ( !invitation ) {
      if ( App.inviteController.get('hasUser') && !!product && !!venue ) {
        App.uiManager.initAsyncEvent();
        var self = this;
        if ( App.isNative ) {
          text = I18n.t('popup_meet_someone');
          navigator.notification.confirm( text, function(confirm) {
            if ( confirm === 1) {
              self._execute(sm, product, invitation, venue, true);
            } else {
              App.uiManager.endAsyncEvent();
            }
          });
        } else {
          self._execute(sm, product, invitation, venue, true);
        }
      } else {
        i18nMessage = ( !product ) ? 'popup_invitation_not_complete_product': 'popup_invitation_not_complete_person';
        text = I18n.t(i18n_message);
        title = I18n.t('popup_title');        
        navigator.notification.alert( text, function(){}, title);
      }
    } else {
      // asserting
      App.notificationController.error();
    }

	},



	sendInvitation: function(sm) {

		var product = App.inviteController.get('product'),
        invitation = App.inviteController.get('invitation'),
        venue = App.inviteController.get('venue');

		if ( App.inviteController.get('hasUser') && (!!product || !!invitation) && !!venue ) {

			App.uiManager.initAsyncEvent();

			//Payment
			if ( App.isNative && !!product && !product.get('isFree') ) {

				var self = this,
						properties = {amount: product.get('price'),
													currencyCode: I18n.t('currency_code'), 
													appKey: App.settings.ZooZ.appKey, 
													isSandbox: App.settings.ZooZ.isSandbox};

				window.plugins.zoozCheckout.pay(properties, function(r) {
					// assign r.transactionId
					self._execute(sm, product, invitation, venue);
				}, function(e) {
					console.log('Error pay. Message [ ' + e.errorMessage + ' ] code ' + e.errorCode);
          if ( e.errorCode === 99 ) {
            console.log('payment canceling');
          }
					App.uiManager.endAsyncEvent();
				});


			} else {

				this._execute(sm, product, invitation, venue);

			}


		} else if ( App.isNative ) {

      var i18n_message = ( !product ) ? 'popup_invitation_not_complete_product': 'popup_invitation_not_complete_person',
          text = I18n.t(i18n_message),
          title = I18n.t('popup_title');        

      navigator.notification.alert( text, function(){}, title);

		}

	},

	/*PRIVATE METHODS*/
  // create or resend invitation
	_execute: function(sm, product, invitation, venue, isRecommendation) {

    App.inviteController.set('isExecutingAction', true);
		
		var	user = App.loginUserController.get('content'),
				toUser = App.inviteController.get('user'),
        comment = App.inputsController.get('inviteComment'),
				self = this,
				agendaUser = App.inviteController.get('agendaUser'),
				facebookUser = App.inviteController.get('facebookUser'),
        action,
				properties;


    if (!!toUser ) {

      properties = {
        creationType: Yn.InvitationUserType.yoin,
        creationUsername: toUser.get('name'),

        toUser: toUser,
        creationPhone: null,
        creationFbId: null
      };

    } else if ( !!facebookUser ) {

      properties = {
        creationType: Yn.InvitationUserType.facebook,
        creationUsername: facebookUser.name,

        toUser: null,
        creationPhone: null,
        creationFbId: facebookUser.id
      };

    } else if ( !!agendaUser ) {

      properties = {
        creationType: Yn.InvitationUserType.phone,
        creationUsername: agendaUser.name,
        creationEmail: agendaUser.email,
        creationPhone: agendaUser.phone,
        toUser: null,
        creationFbId: null
      };

    }

    if ( !invitation ) {

      properties.product = product;
      properties.venue = venue;
      properties.initComment = comment;
      action='Create';
      invitation = Yn.Invitation.createRecord(properties);

      if (isRecommendation === true ) {
        invitation.set('recommendation', true);
      }

    } else {

      action='Update';
      // TODO: make something with comment
      invitation.setProperties(properties);

    }


    App.inputsController.set('inviteComment', null);

    // TODO; expecting ember-data
    var always = function() {
      App.inviteController.set('isExecutingAction', false);
      if ( action === 'Update' ) { 
        Em.removeListener(invitation, 'didUpdate');
        Em.removeListener(invitation, 'didUpdateError');
      }
    };


    invitation.one('did'+action, function(item) {
      always();
      App.inviteController.set('successInvitation', item);
      self.refreshUser();

      if ( action === 'Update' ) { 

        // remove from list
        App.inboxInvitationsController.get('content').removeObject(invitation);

        var manager = App.walletManager;
        manager.get('navigationView').popToRootView(function() {
          manager.goToState('wallet');
        });
        
        if ( !!comment ) {

          var commentInstance = Yn.Comment.createRecord({
            comment: comment, 
            invitation: invitation });

          commentInstance.on('didCreate', function() {
            App.store.reload(item);
          });
          App.store.commit();

        }

      }

      App.notificationsController.refresh();
      sm.goToState('notification');
    });

    invitation.one('did'+action+'Error', function(error) {
      always();
      App.uiManager.endAsyncEvent();
      if (App.isNative && error.status === 404 ) {
        var text = I18n.t('message_not_found_invitation_error'),
            title = I18n.t('popup_title');        
        navigator.notification.alert( text, function(){}, title);
      }
    });    
		App.store.commit();

	}

});
