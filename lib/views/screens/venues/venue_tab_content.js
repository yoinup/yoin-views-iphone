

Yvi.VenuesTabContentView = Em.View.extend({
  classNames:['venues-tab-content'],
  content: null,
  isRefreshed: false,
	loggedUser: null,

	isContentLoaded: Em.computed(function() {

		return !!this.get('content');

	}).property('content'),

  templateName:"venues_tab_content"

});
