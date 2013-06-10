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

Yvi.VenuesScreenView = Yvi.ScreenView.extend(Yvi.HasUser, {

  elementId: 'venues-screen',
  screenContext: {},

  classNameBindings: ['showOneFriend', 'showTwoFriends', 'showThreeFriends'],

	content: null,
	isRefreshed: null,

	setMinHeight: true,

  loggedUser: null,
  selectedCity: null,

  friends: null,
  newFriends: null,

  notificationsCounter: null,

  showSearchingText: Em.computed(function() {

    var result = I18n.t('products_around') + ' ';
 
    if ( this.get('hasUser') ) {
      result += this.get('username');

      if ( this.get('selectedCity') ) {
        result += ' (' + this.get('selectedCity.name') + ')';
      }
    } else {
      result += this.get('selectedCity.name');
    }
    return result;
  }).property('hasUser', 'selectedCity'),

  showOneFriend: Em.computed(function() {
    return this.get('nextThreeFriends.length') === 1;
  }).property('nextThreeFriends'),

  showTwoFriends: Em.computed(function() {
    return this.get('nextThreeFriends.length') === 2;
  }).property('nextThreeFriends'),

  showThreeFriends: Em.computed(function() {
    return this.get('nextThreeFriends.length') === 3;
  }).property('nextThreeFriends'),


  nextThreeFriends: Em.computed(function() {

    var friends = this.get('friends'),
        newFriends = this.get('newFriends'),
        result = Em.A([]),
        length,
        selectedLimit = 3;



    if ( !!newFriends && newFriends.get('length') > 0 ) {

      length = newFriends.get('length');
      if ( length < selectedLimit ) {
        selectedLimit = length;
      }

      this._addRandomFriends(newFriends, result, selectedLimit);
    }
    else if ( !!friends ) {

      length = friends.get('length');
      if ( length < selectedLimit ) {
        selectedLimit = length;
      }
      this._addRandomFriends(friends, result, selectedLimit);
    }


    return result;

  }).property('friends', 'newFriends'),

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

  isGeopositionOn: false,

	isContentLoaded: Em.computed(function() {

		return this.get('content.isLoaded');

	}).property('content.isLoaded')

});
