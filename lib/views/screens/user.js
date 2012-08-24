Yvi.UserTabOptionView = Em.View.extend( Yvi.TabOption, {
	classNames: ['user-tab'],
	currentTabView: null


});


Yvi.UserScreenView = Yvi.ScreenView.extend({

	elementId: 'user_screen',

	user: null,

	sentinvitations: null,
	
	receivedinvitations: null,

	//venuesBinding: Em.Binding.oneWay('App.orderedVenuesController')

	currentTabView: null,

	didInsertElement: function() {
		this._super();
	}



});
