Yvi.UserType = {
	appuser: 'appuser',
	FbChannel: 'FbChannel',
	PhoneChannel: 'PhoneChannel'
};

Yvi.UserShortBlockView = Em.View.extend(Yn.Btap, {

  classNames: ['user-short-block'],

  content: null,

	imagetype: null,

	showCity: true,

	//Default type
	type: Yvi.UserType.appuser,

	
	fbName: null,
	fbId: null,
	phoneNumber: null,
	phoneName: null,


	isYoinUser: Em.computed(function() {
		return (this.get('type') === Yvi.UserType.appuser);
	}).property('type'),

	isFbUser: Em.computed(function() {
		return (this.get('type') === Yvi.UserType.FbChannel);
	}).property('type'),

	isPhoneUser: Em.computed(function() {
		return (this.get('type') === Yvi.UserType.PhoneChannel);
	}).property('type'),
	

	// this can be done inside the view
  action: 'selectUser',
  actionContentBinding: Em.Binding.oneWay('content'),

  templateName: 'user_short_block'

});
