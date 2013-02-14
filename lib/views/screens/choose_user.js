Yvi.ChooseUserOption = {
	facebook: 'facebook',
	yoin: 'yoin'
};


Yvi.ChooseUserMenuTabsView = Yn.MenuTabsButtonView.extend({
  
  content: Em.A([ {'name': 'facebook', 'action': Yvi.ChooseUserOption.facebook}, 
                  {'name': 'yoin', 'action': Yvi.ChooseUserOption.yoin} ]),
  
  selected: null
  
});


Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose_user_screen',
  withoutFooter: true,

	option: null,

  user: null,

  yoinContent: null,
  facebookContent: null,

  hasYoinFriends: Em.computed(function() {
    return this.get('yoinContent.length') > 0;
  }).property('yoinContent.length')

});
