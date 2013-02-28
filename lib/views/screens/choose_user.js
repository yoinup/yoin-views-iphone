Yvi.ChooseUserOption = {
	facebook: 'facebook',
	yoin: 'yoin',
	nearby: 'nearby'
};

Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose-user-screen',
  withoutFooter: true,

	option: null,

  user: null,

  yoinContent: null,
  facebookContent: null,
  nearsContent: null,
	locationActive: false,
	showNears: true,


  _options: Em.computed(function() {
		var result = Em.A([]);
		result.pushObject({'name': 'facebook', 'action': Yvi.ChooseUserOption.facebook});

		if (this.get('_hasYoinFriends')) {
			result.pushObject({'name': 'yoin', 'action': Yvi.ChooseUserOption.yoin});
		}

		if (this.get('showNears')) {
			result.pushObject({'name': 'nearby', 'action': Yvi.ChooseUserOption.nearby});
		}

		return result;
  }).property('_hasYoinFriends', 'showNears'),

  _hasYoinFriends: Em.computed(function() {
    return this.get('yoinContent.length') > 0;
  }).property('yoinContent.length')

});
