
Yvi.MeEditSettingsState = Yvi.BaseNavigatedState.extend(Yn.UpdateUser, {

  changeName: function(sm) {

		var user = App.loginUserController.get('content');
    this.updateUser(user);

  },

  selectCity: function(sm, city) {

		var user = App.loginUserController.get('content');
    user.set('city', city);
    this.updateUser(user);

  }

});
