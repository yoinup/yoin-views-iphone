

Yvi.VenuesScreenView = Yvi.ScreenView.extend({

  elementId: 'venues_screen',
  screenContext: {},

	content: null,
	isRefreshed: null,

  loggedUser: null,
  selectedCity: null,


  friends: null,
  nextThreeFriends: Em.computed(function() {

    var people = this.get('friends'),
        result;

    if ( !!people ) {
      result = people.slice(0,3);
    }

    return result;

  }).property('friends.length'),


  user: null,
  agendaUser: null,
  facebookUser: null,

  hasUser: Em.computed(function() {
    return ( !!this.get('user') || !!this.get('agendaUser') || !!this.get('facebookUser') );
  }).property('user', 'agendaUser', 'facebookUser'),

  isGeopositionOn: false,

	isContentLoaded: Em.computed(function() {

		return !!this.get('content');

	}).property('content')

});
