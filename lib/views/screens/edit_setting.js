
Yvi.EditSettingScreenView = Yvi.ScreenView.extend({
	elementId: 'edit_setting_screen',

	user: null,
	cities: null,

	/*citiesWithoutLast: Em.computed(function(){
		console.log(this.get('cities').length);
		return this.get('cities').slice(0, 2);
	}).property('cities')*/

});
