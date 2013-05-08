App.VenuesManager = Yvi.StateManager.extend({

  instanceName: 'App.venuesManager',
  enableLogging: false,
	logName: 'Venues',

  initialState: 'venues',

	navigationView: null, 

  venues: Yvi.VenuesVenuesState.extend(),
  map: Yvi.VenuesMapState.extend(),
  friendsNearby: Yvi.VenuesFriendsNearbyState.extend()


});
