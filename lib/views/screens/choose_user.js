Yvi.ChooseUserOption = {
	facebook: 'facebook',
	yoin: 'yoin',
	nearby: 'nearby'
};

Yvi.ChooseUserMenuTabsView = Yn.MenuTabsButtonView.extend({
  
  content: Em.A([ {'name': 'facebook', 'action': Yvi.ChooseUserOption.facebook}, 
                  {'name': 'yoin', 'action': Yvi.ChooseUserOption.yoin} ,
                  {'name': 'nearby', 'action': Yvi.ChooseUserOption.nearby} ]),
  
  selected: null
  
});

Yvi.ChooseUser2MenuTabsView = Yn.MenuTabsButtonView.extend({
  
  content: Em.A([ {'name': 'facebook', 'action': Yvi.ChooseUserOption.facebook}, 
                  {'name': 'nearby', 'action': Yvi.ChooseUserOption.nearby} ]),
  
  selected: null
  
});

Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose-user-screen',
  withoutFooter: true,

	option: null,

  user: null,

  yoinContent: null,
  facebookContent: null,
  nearsContent: null,
	locationActive: false,

  hasYoinFriends: Em.computed(function() {
    return this.get('yoinContent.length') > 0;
  }).property('yoinContent.length')

});
