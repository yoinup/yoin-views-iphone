Yvi.MeTabOptionView = Em.View.extend( Yvi.TabOption, {
	classNames: ['me-tab'],
	currentTabViewBinding: Em.Binding.oneWay('App.tabController.meTabView')

});


Yvi.MeScreenView = Yvi.ScreenView.extend({

	elementId: 'me_screen',

  manager: 'App.meManager',

	userBinding: Em.Binding.oneWay('App.loginUserController.content'),

	friendslist: null,

	sentinvitationsBinding: Em.Binding.oneWay('App.sentInvitationController'),
	
	receivedinvitationsBinding: Em.Binding.oneWay('App.receivedInvitationController'),

	//venuesBinding: Em.Binding.oneWay('App.orderedVenuesController')


	currentTabView: null,

	didInsertElement: function() {
		this._super();
		var list = Em.A([{ name: 'Pepe', city: 'Huelva' }, { name: 'Diego', city: 'Toronto' }]);
		this.set('friendslist', list);
	}



});
