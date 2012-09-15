

Yvi.InviteScreenView = Yvi.ScreenView.extend({
  elementId: 'invite_screen',

  product: null,
  venue: null,

  contactUser: null,
  fbUser: null,
  user: null,

  userName: Em.computed(function() {

    var user;

    user = this.get('user');
    if (!!user ) {
      return user.get('name');
    } 

    user = this.get('fbUser');
    if (!!user ) {
      return user.name;
    } 

    user = this.get('contactUser');
    if (!!user ) {
      return user.name;
    } 

    return;

  }).property('contactUser', 'fbUser', 'user'),

  userAvatar: Em.computed(function() {

    var user;

    user = this.get('user');
    if (!!user ) {
      return user.get('avatar');
    } 

    user = this.get('fbUser');
    if (!!user ) {
      return user.photo;
    } 

    user = this.get('contactUser');
    if (!!user ) {
      return user.photo;
    } 

    return;

  }).property('contactUser', 'fbUser', 'user')

});
