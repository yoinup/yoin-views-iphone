
App.nearUsersController = Yvi.NearUsersController.create({
  settings: App.settings
});
App.loginUserController = Yvi.LoginUserController.create({});

App.inboxReceivedController = Yvi.BaseWalletController.create({});
App.inboxSentController = Yvi.BaseWalletController.create({});
App.archivedReceivedController = Yvi.BaseWalletController.create({});
App.archivedSentController = Yvi.BaseWalletController.create({});

App.walletController = Yvi.WalletController.create({
  loginUserController: App.loginUserController,

  inboxReceivedController: App.inboxReceivedController,
  inboxSentController: App.inboxSentController,
  archivedReceivedController: App.archivedReceivedController,
  archivedSentController: App.archivedSentController
});




App.categoryController = Yvi.CategoryController.create({});

App.cityController = Em.ArrayController.create({
  content: null,
  defaultCity: null,
  selected: null

});

App.facebookUserController = Yvi.FacebookUserController.create({

});

App.friendsController = Yvi.FriendsController.create({

});

App.friendsNearbyController = Em.Object.create({
	venue: null,
  people: null

});

App.geopositionController = Yvi.GeopositionController.create({
  settings: App.settings,
  cityController: App.cityController,
  nearUsersController: App.nearUsersController
});

App.inviteController = Yvi.InviteController.create({
  geopositionController: App.geopositionController

});

App.venuesController = Yvi.VenuesController.create({
  geopositionController: App.geopositionController,
  settings: App.settings

});

App.mapVenuesController = Yvi.MapVenuesController.create({
  geopositionController: App.geopositionController,
  settings: App.settings

});


App.geopositionController.mapVenuesController = App.mapVenuesController;
App.geopositionController.venuesController = App.venuesController;


