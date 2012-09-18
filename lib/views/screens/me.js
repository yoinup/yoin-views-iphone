Yvi.MeTabOptionView = Em.View.extend( Yvi.TabOption, {
	classNames: ['me-tab'],
	currentTabView: null


});


Yvi.MeScreenView = Yvi.ScreenView.extend({

	elementId: 'me_screen',

	user: null,
	friends: null,
	unexchangedinvitations: null,
	sentinvitations: null,

	currentTabView: null


});
