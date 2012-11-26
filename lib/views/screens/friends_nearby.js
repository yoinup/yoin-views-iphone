Yvi.FriendsNearbyOption = {
	list: 'list',
	people: 'people'
};


Yvi.FriendsNearbyMenuTabsView = Yn.MenuTabsButtonView.extend({
	
	content: Em.A([ {'name': Yvi.FriendsNearbyOption.list, 'action': Yvi.FriendsNearbyOption.list}, 
									{'name': Yvi.FriendsNearbyOption.people, 'action': Yvi.FriendsNearbyOption.people} ]),
	
	selected: null
	
});



Yvi.FriendsNearbyScreenView = Yvi.ScreenView.extend({
  elementId: 'friends_nearby_screen',

  classNames: ['is-complete-screen'],

	option: null,

  content: null,

  isContentLoaded: Em.computed(function() {

		return !!this.get('content');

	}).property('content')
  
});
