
//Añadido Yn.Modal para que se quite el footer

Yvi.ActivityScreenView = Yvi.ScreenView.extend(Yn.Modal, {
  elementId: 'activity_screen',

  classNames: ['is-complete-screen'],
  activities: null,

  loggedUser: null,

	isContentLoaded: Em.computed(function() {

		//return this.getPath('content.isLoaded');
		return !!this.get('activities');

	}).property('activities')

});
