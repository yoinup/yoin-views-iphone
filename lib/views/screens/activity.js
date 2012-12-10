
//Añadido Yn.Modal para que se quite el footer

Yvi.ActivityScreenView = Yvi.ScreenView.extend(Yn.Modal, {
  elementId: 'activity_screen',

  classNames: ['without-footer'],
  activities: null,

  loggedUser: null,

	isContentLoaded: Em.computed(function() {

		//return this.getPath('content.isLoaded');
		return !!this.get('activities');

	}).property('activities')

});
