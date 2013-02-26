
Yvi.ActivityController = Em.ArrayController.extend({

  loginUserController: null,
	refresh: function() {
		
    var self = this,
        userId = this.loginUserController.get('content.id'),
				query = { user_id: userId,
                   only: 'invitation',
                   limit: 80 },
        array = App.store.find(Yn.Activity, query);

    this.set('content', array);

  }

});
