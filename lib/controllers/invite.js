
Yvi.InviteController = Em.Object.extend({
	product: null,
	venue: null,
  venues: null,
  invitation: null,

  successInvitation: null,

  isExecutingAction: false,
	user: null,
  facebookUser: null,
  agendaUser: null,
  isNearby: false,

  username: Em.computed(function() {

    var user = this.get('user'),
        name;

    if (!!user) {
      name = user.get('name');
    } else {
      user = this.get('agendaUser');
      if (!!user) {
        name = user.name;
      } else {
        user = this.get('facebookUser');
        if (!!user) {
          name = user.name;
        }
      
      }
    }
    return name;

  }).property('user', 'facebookUser', 'agendaUser'),

  hasUser: Em.computed(function() {

    return !!this.get('user') || !!this.get('facebookUser') || !!this.get('agendaUser');

  }).property('user', 'facebookUser', 'agendaUser'),

	notification: null,

  setProduct: function(product) {
    this.set('product', product);
    this.set('invitation', null);
  },

  setInvitation: function(invitation) {
    this.set('invitation', invitation);
    this.set('venue', invitation.get('venue') );
    this.set('product', null);
    this.set('venues', null);
  },

  clearUsers: function() {

    this.set('user', null );
    this.set('facebookUser', null );
    this.set('agendaUser', null );

  },

  clear: function() {

    this.set('isNearby', false);
    this.set('product', null);
    this.set('venue', null);
    this.set('venues', null);
    this.set('invitation', null);
    this.set('successInvitation', null);
    this.clearUsers();
  },

  _userChanged: Em.observer(function() {

    var user = this.get('user');
    if ( !user ) return;

    var self = this;
    user.then(function() {

      var fn = function(item) {
        item.then(function() {
          var coordinates = {lat: item.get('lat'), lon: item.get('lon')};
          self.geopositionController.refreshPosition(null, coordinates);
        });
      };

      var checkin = user.get('checkin');
      if ( !!checkin ) {
        fn(checkin);
      } else {
        var city = user.get('city');
        if ( !!city ) {
          fn(city);
        }
      }
    });


  }, 'user')

});
