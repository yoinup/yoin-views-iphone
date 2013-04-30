Yvi.InvitationState = Yvi.BaseNavigatedState.extend( Yn.UpdateUser, Yvi.NavigationBackEvent, {

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
    invitation.set('accepted', true);
    this._localInvitationUpdate(sm, invitation);
  },

  reject: function(sm, invitation) {
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

  useIt: function(sm) {
    App.uiManager.initAsyncEvent();
    sm.goToState('scanInvitation');
  },

  _localInvitationUpdate: function(sm, invitation) {

    if ( invitation.get('rejected') ) {

      App.uiManager.initAsyncEvent();
      var always = function() {
        Em.removeListener(invitation, 'didUpdate');
        Em.removeListener(invitation, 'didUpdateError');
      };
      invitation.one('didUpdate', function() {
        always();
      });
      invitation.one('didUpdateError', function() {
        App.notificationController.error();

        App.inboxReceivedController.get('content').pushObject(this);
        App.archivedReceivedController.get('content').removeObject(this);
        always();
      });

      App.inboxReceivedController.get('content').removeObject(invitation);
      App.archivedReceivedController.get('content').pushObject(invitation);
      this.doBack(sm);

    }
    // TODO: does not manage errors for accepted
    App.store.commit();
  }

});
