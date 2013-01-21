Yvi.VenuesSpinnerView = Yn.SpinnerView.extend({
  selectedCity: null,

  content: Em.computed(function() {

    var city = this.get('selectedCity'),
        result;

    if ( !!city ) {
      result = I18n.t('searching_in') + ' ' + city.get('name'); 
    }

    return result;

  }).property('selectedCity')

});

Yvi.VenuesScreenView = Yvi.ScreenView.extend({

  elementId: 'venues_screen',
  screenContext: {},

	content: null,
	isRefreshed: null,

  loggedUser: null,
  selectedCity: null,

  friends: null,
  nextThreeFriends: Em.computed(function() {

    var friends = this.get('friends'),
        result = Em.A([]),
        length,
        selectedLimit = 3;

    if ( !!friends ) {

      length = friends.get('length');
      if ( length < selectedLimit ) {
        selectedLimit = length;
      }

      if ( !!friends ) {
        this._addRandomFriends(friends, result, selectedLimit);
      }

    }

    return result;

  }).property('friends'),

  _addRandomFriends: function(friends, array, addLimit) {
    var added = 0,
        friendsLength = friends.get('length'),
        j,
        item;

    while( added !== addLimit ) {
      j = Math.floor(Math.random() * friendsLength) ;
      item = friends.objectAt(j);
      if ( !array.contains(item) ) {
        array.pushObject(item);
        added++;
      }
    }
  },

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
