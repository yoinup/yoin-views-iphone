Yvi.WalletInvitationState = Yvi.BaseNavigatedState.extend( Yn.UpdateUser, Yvi.NavigationBackEvent, {

  sendComment: function(sm) {

    var invitation = App.walletController.get('selected'),
        user = App.loginUserController.get('content'),
        message = App.inputsController.get('invitationComment');

    if ( !!message ) {
      App.inputsController.set('invitationComment', null);

			App.uiManager.initAsyncEvent();

      var comment,
          properties = { comment: message,
                         user: user,
                         submitDate: new Date(),
                         invitation: invitation };

      comment = Yn.Comment.createRecord(properties);

      comment.one('didCreate', function() {
        App.uiManager.endAsyncEvent();
      });
      comment.one('didCreateError', function() {
        App.uiManager.endAsyncEvent();
        App.notificationController.error();
      });
      App.store.commit();

    }

  },

  accept: function(sm, invitation) {
    App.uiManager.initAsyncEvent();
    invitation.set('accepted', true);
    this._localInvitationUpdate(sm, invitation);
  },

  reject: function(sm, invitation) {
    App.uiManager.initAsyncEvent();
    invitation.set('rejected', true);
    this._localInvitationUpdate(sm, invitation);
  },


  showTerms: function(sm, invitation) {
    App.uiManager.initAsyncEvent();
		sm.goToState('terms');
  },

  resend: function(sm, invitation) {

    App.uiManager.initAsyncEvent();
    App.inviteController.setInvitation(invitation);
    App.checkoutManager.send('goToInvite');

  },


	goToMap: function(sm, invitation) {

    App.uiManager.initAsyncEvent();
    var venue = invitation.get('venue');
		App.mapScreenView.setProperties({ '_withHeaderAction': false,
                                      'venue': venue, 
                                      'showVenue': true, 
                                      'manager': sm });
		App.appendToRoot(App.mapScreenView);
		sm.goToState('map');

	},

  closeRecommendation: function(sm, invitation) {
    this._processInvitation(sm, invitation);
  },

  useIt: function(sm, invitation) {
    this._processInvitation(sm, invitation);
  },

  _processInvitation: function(sm, invitation) {

    App.uiManager.initAsyncEvent();
    if ( App.isNative ) {

      var self = this;
      var langEntry = invitation.get('recommendation') ? 'confirm_close_recommendation' : 'confirm_did_you_consume_invitation';
      navigator.notification.confirm( I18n.t(langEntry), function(confirm) {
        if ( confirm === 1) {
          self._markAsProcessing(sm, invitation);
        } else {
          App.uiManager.endAsyncEvent();
        }
      });

    } else {
      this._markAsProcessing(sm, invitation);
    }

  },

  _localInvitationUpdate: function(sm, invitation) {

    var always = function() {
      Em.removeListener(invitation, 'didUpdate');
      Em.removeListener(invitation, 'didUpdateError');
      App.uiManager.endAsyncEvent();
    };

    invitation.one('didUpdate', function() {
      always();
    });

    invitation.one('didUpdateError', function() {
      // TODO: rollback
      invitation.set('accepted', false);
      invitation.set('rejected', false);
      App.notificationController.error();
      always();
    });
    App.store.commit();

  },

  _markAsProcessing: function(sm, invitation) {
    
    //if ( invitation.get('accepted') ) {

      invitation.set('processing', true);
      var always = function() {
        Em.removeListener(invitation, 'didUpdate');
        Em.removeListener(invitation, 'didUpdateError');
      };

      var self = this;
      invitation.one('didUpdate', function() {
        always();
        self.refreshUser();

        if ( invitation.get('recommendation') ) {
          self.doBack(sm, true);
        } else {
          sm.goToState('scanInvitation');
        }
      });

      invitation.one('didUpdateError', function() {
        always();
        App.notificationController.error();
        App.uiManager.endAsyncEvent();
      });

      App.store.commit();
      /*
    } else {
      App.notificationController.error();
      App.uiManager.endAsyncEvent();
    }
    */

  }

});
