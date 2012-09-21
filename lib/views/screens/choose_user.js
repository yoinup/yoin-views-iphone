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


	title: Em.computed(function() {
		return this.get('optionIsFriends') ? I18n.t('choose_user_' + this.get('selectedFriendsOption') ) : I18n.t('nears') ;
	}).property('selectedFriendsOption', 'option'),


  tabOption: Em.computed(function() {
		return this.get('optionIsFriends') ? this.get('selectedFriendsOption')  : 'nears';
	}).property('selectedFriendsOption', 'option'),


  yoinContent: null,
  twitterContent: null,
  facebookContent: null,
  agendaContent: null,


  isNearsContentLoaded: Em.computed(function() {

    var nearUsers = this.getPath('venue.nearsUsers');
    return ( !!nearUsers ) ?  nearUsers.get('isLoaded')  : true;

  }).property('nearsContent.isLoaded')



});
