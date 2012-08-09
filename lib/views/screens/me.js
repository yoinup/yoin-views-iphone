Yvi.MeTabOptionView = Em.View.extend( Yvi.TabOption, {
	classNames: ['me-tab'],
	currentTabView: null


});


Yvi.MeScreenView = Yvi.ScreenView.extend({

	elementId: 'me_screen',

	user: null,

	sentinvitations: null,
	
	receivedinvitations: null,

	//venuesBinding: Em.Binding.oneWay('App.orderedVenuesController')

	currentTabView: null,
	
	isUserCity: Em.computed(function(){
		
		return !!this.getPath('user.city');
		
	}).property('user.city'),

	didInsertElement: function() {
		this._super();
	}



});

/*
<div id="me-content-header-text-name">


	{{user.name}}

</div>
*/