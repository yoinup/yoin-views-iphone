Yvi.UserType = {
	appuser: 'appuser',
	FbChannel: 'FbChannel',
	PhoneChannel: 'PhoneChannel'
};

Yvi.UserShortBlockView = Em.View.extend({

  classNameBindings: ['hasInviteButton', 'hasImage'],
  classNames: ['user', 'short-block'],

  content: null,

	imagetype: null,

	showCity: true,

	//Default type
	type: Yvi.UserType.appuser,

	
	fbName: null,
	fbId: null,
	phoneNumber: null,
	phoneName: null,

  hasInviteButton: false,

  hasImage: Em.computed(function() {
		return (this.get('type') !== Yvi.UserType.PhoneChannel);
  }).property('type'),

	isYoinUser: Em.computed(function() {
		return (this.get('type') === Yvi.UserType.appuser);
	}).property('type'),

	isFbUser: Em.computed(function() {
		return (this.get('type') === Yvi.UserType.FbChannel);
	}).property('type'),

	isPhoneUser: Em.computed(function() {
		return (this.get('type') === Yvi.UserType.PhoneChannel);
	}).property('type'),
	


  templateName: 'user_short_block'

});

Yvi.TapUserShortBlockView = Yvi.UserShortBlockView.extend(Yn.Btap, {

});
