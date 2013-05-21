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

    var controller = App.loginUserController;
    var user = controller.get('content');

    if ( !!user && !controller.get('isFetchingContent') ) {

      controller.set('isFetchingContent', true);

      var self = this,
          unexchangedInvitationsCount = user.get('unexchangedInvitationsCount'),
          friendsCount = user.get('friendsCount'),
          sentInvitationsCount = user.get('sentInvitationsCount');

      var refreshDependenciesData = function() {
        Em.removeObserver(user, 'data', refreshDependenciesData);
        if ( friendsCount !== user.get('friendsCount') ) {
          App.friendsController.refresh();
        }
        controller.set('isFetchingContent', false);
      };

      Em.addObserver(user, 'data', refreshDependenciesData);
      App.store.reload(user, {extended: true});
      return user;
    }
    
  }

});
