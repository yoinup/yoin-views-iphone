Yvi.ChooseUserOption = {
	friends: 'friends',
	nears: 'nears'
};


Yvi.ChooseUserMenuTabsView = Yn.MenuTabsButtonView.extend({
  
  content: Em.A([ {'name': Yvi.ChooseUserOption.friends, 'action': Yvi.ChooseUserOption.friends}, 
                  {'name': Yvi.ChooseUserOption.nears, 'action': Yvi.ChooseUserOption.nears} ]),
  
  selected: null
  
});


Yvi.ChooseUserChannelButtonView = Em.View.extend( Yn.Btap, Yn.IsSelected, {

  action: 'selectChannel',

  actionContentBinding: Em.Binding.oneWay('content')

});


Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose_user_screen',

	option: null,
	allOptions: ['agenda', 'facebook', 'twitter', 'yoin'],
  selectedFriendsOption: null,
  venue: null,
  user: null,

	optionIsFriends: Em.computed(function() {
		return this.get('option') === Yvi.ChooseUserOption.friends;
	}).property('option'),

  isAgenda: Em.computed(function() {
    return this.get('user').getPath('phoneChannels.length') > 0;
  }).property('user'),

  isFacebook: Em.computed(function() {
    return !!this.get('user').get('fbChannel');
  }).property('user'),

  isTwitter: Em.computed(function() {
    return false;
  }).property('user'),

  isYoin: Em.computed(function() {
    return this.get('user').get('friendsCount') > 0;
  }).property('user'),

  nearUsers: null,
  fbUsers: null,
  friendUsers: null,
  agendaUsers: null,

	title: Em.computed(function() {
		return this.get('optionIsAll') ? I18n.t('choose_user_' + this.get('selectedFriendsOption') ) : I18n.t('nears') ;
	}).property('selectedFriendsOption', 'option'),


  tabOption: Em.computed(function() {
		return this.get('optionIsFriends') ? this.get('selectedFriendsOption')  : 'nears';
	}).property('selectedFriendsOption', 'option')


});
