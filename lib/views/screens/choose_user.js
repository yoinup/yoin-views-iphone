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

  classNames: ['channel-button'],
  action: 'selectChannel',
  actionContentBinding: Em.Binding.oneWay('content')

});


Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose_user_screen',

	option: null,
	allOptions: ['agenda', 'yoin', 'facebook', 'twitter'],
  selectedFriendsOption: null,
  venue: null,
  user: null,

	optionIsFriends: Em.computed(function() {
		return this.get('option') === Yvi.ChooseUserOption.friends;
	}).property('option'),




  isAgendaDisabled: Em.computed(function() {
    return (this.getPath('user.phoneChannels.length') > 0) !== true;
  }).property('user.phoneChannels.@each'),

  isFacebookDisabled: Em.computed(function() {
    return !this.get('user').get('fbChannel');
  }).property('user.fbChannel'),

  isTwitterDisabled: Em.computed(function() {
    return true;
  }).property('user'),

  isYoinDisabled: Em.computed(function() {

    return (this.getPath('user.friendsCount') > 0) === false;

  }).property('user.friendsCount'),


  isYoinContentLoaded: Em.computed(function() {
    return true;
  }).property('yoinContent'),

  isTwitterContentLoaded: Em.computed(function() {
    return false;
  }).property('twitterContent'),

  isFacebookContentLoaded: Em.computed(function() {
    return true;
  }).property('facebookContent'),

  isAgendaContentLoaded: Em.computed(function() {
    return true;
  }).property('agendaContent'),


  isNearContentLoaded: Em.computed(function() {
    return true;
  }).property('nearContent'),

  yoinContent: null,
  twitterContent: null,
  facebookContent: null,
  agendaContent: null,
  nearContent: null,

	title: Em.computed(function() {
		return this.get('optionIsFriends') ? I18n.t('choose_user_' + this.get('selectedFriendsOption') ) : I18n.t('nears') ;
	}).property('selectedFriendsOption', 'option'),


  tabOption: Em.computed(function() {
		return this.get('optionIsFriends') ? this.get('selectedFriendsOption')  : 'nears';
	}).property('selectedFriendsOption', 'option')


});
