
Yvi.LoginUserController = Em.Object.extend({
  content: null,
	// cannot be assigned because it also created as a background-task
  checkin: null,

  isRegistered: Ember.computed(function() {
    return ( this.get('content') !== null ); 
  }).property('content'),

  hasFacebook: false,

	isPendingPhoneValidation: false

});
