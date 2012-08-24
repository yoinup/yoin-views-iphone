
Yvi.VenuesScrollView = Yn.ScrollerView.extend({
  holdPeriod: 2000,

  didBottomRefresh: function() {

    this.manager.send('refresh');

  }

});


Yvi.VenuesTabContentView = Em.View.extend({
  classNames:['venues-tab-content'],
  content: null,
  isRefreshed: false,
  showLikes: true,

	isContentLoaded: Em.computed(function() {

		//return this.getPath('content.isLoaded');
		return !!this.get('content');

	}).property('content'),

  templateName:"venues_tab_content"
});
