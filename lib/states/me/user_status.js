
Yvi.MeUserStatusState = Yvi.BaseNavigatedState.extend(Yn.UpdateUser, {

	selectStatus: function(sm, status) {

		this._updateStatus(sm, status);

	},

	writeStatus: function(sm) {

    var status = App.inputsController.get('userStatus');
    this._updateStatus(sm, status);
    App.inputsController.set('userStatus', null);

	},

	_updateStatus: function(sm, status) {

		var user = App.loginUserController.get('content');
		user.set('status', status);
    this.updateUser(user);

	}

});
