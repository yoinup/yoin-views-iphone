Yvi.MeTabOptionView = Em.View.extend( Yn.TabOption, {
	classNames: ['me-tab'],
	currentTabView: null


});


Yvi.MeScreenView = Yvi.ScreenView.extend({

	elementId: 'me_screen',

	user: null,
	friends: null,
	activities: null,

	currentTabView: null


});
