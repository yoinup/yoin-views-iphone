Yvi.ChooseUserView = {
	all: 'all',
	nears: 'nears'
};

Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose_user_screen',

	option: null,
	allOptions: ['agenda', 'facebook', 'twitter', 'yoin'],
  selectedAllOption: null,
  venue: null,
  user: null,

	optionIsAll: Em.computed(function() {
		return this.get('option') === Yvi.ChooseUserView.all;
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
		return this.get('optionIsAll') ? I18n.t('choose_user_' + this.get('selectedAllOption') ) : I18n.t('nears') ;
	}).property('selectedAllOption', 'option'),


  tabOption: Em.computed(function() {
		return this.get('optionIsAll') ? this.get('selectedAllOption')  : 'nears';
	}).property('selectedAllOption', 'option')


});
