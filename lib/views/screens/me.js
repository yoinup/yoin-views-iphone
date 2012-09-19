Yvi.MeTabOptionView = Em.View.extend( Yvi.TabOption, {
	classNames: ['me-tab'],
	currentTabView: null


});


Yvi.MeScreenView = Yvi.ScreenView.extend({

	elementId: 'me_screen',

	user: null,
	friends: null,
	unexchangedInvitations: null,
	sentInvitations: null,

	currentTabView: null


});
