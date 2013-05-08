
App.FriendsNearbyScreenView = Yvi.FriendsNearbyScreenView.extend({
  manager: 'App.venuesManager',
  venueBinding: Em.Binding.oneWay('App.friendsNearbyController.venue'),
  contentBinding: Em.Binding.oneWay('App.friendsNearbyController.people')

});
