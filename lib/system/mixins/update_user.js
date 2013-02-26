Yn.UpdateUser = Em.Mixin.create({
	
  updateUser: function(user) {
		
    var always = function() {
      Em.removeListener(user, 'didUpdate');
      Em.removeListener(user, 'didUpdateError');
    };

    user.on('didUpdate', function(){
      always();
    });
    user.on('didUpdateError', function(){
      App.store.reload(user, {extended: true});
      always();
    });
		App.store.commit();

  },

  refreshUser: function() {

    var user = App.loginUserController.get('content');

    if ( !!user ) {

      var self = this,
          unexchangedInvitationsCount = user.get('unexchangedInvitationsCount'),
          friendsCount = user.get('friendsCount'),
          sentInvitationsCount = user.get('sentInvitationsCount');

      var refreshDependenciesData = function() {

        Em.removeObserver(user, 'data', refreshDependenciesData);

        if ( unexchangedInvitationsCount !== user.get('unexchangedInvitationsCount') ) {
          self._refreshUnexchangedInvitations();
        }

        if ( sentInvitationsCount !== user.get('sentInvitationsCount') ) {
          self._refreshSentInvitations();
        }

        if ( friendsCount !== user.get('friendsCount') ) {
          self._refreshFriends();
        }

      };

      Em.addObserver(user, 'data', refreshDependenciesData);
      App.store.reload(user, {extended: true});
      return user;
    }
    
  },


  _refreshUnexchangedInvitations: function() {
    App.walletController.refresh();
    if ( !!App.activityMeController ) {
      App.activityMeController.refresh();
    }
  },

  _refreshSentInvitations: function() {
    if ( !!App.activityMeController ) {
      App.activityMeController.refresh();
    }
  },

  _refreshFriends: function() {
    App.friendsController.refresh();
  }

});
