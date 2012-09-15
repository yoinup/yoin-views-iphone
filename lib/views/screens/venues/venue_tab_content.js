
Yvi.VenuesRefreshScrollerView = Yn.RefreshScrollerView.extend({
	isCategoryOption: false,
	

	// set height dynamically
	exclude: Em.computed(function() {

		var result = 'footer venues-header venues-option-tabs';
		if ( this.get('isCategoryOption') ) {
			result +=' venues-categories';
		}
		return result;

	}).property('isCategoryOption')



});


Yvi.VenuesTabContentView = Em.View.extend({
  classNames:['venues-tab-content'],
  content: null,
  isRefreshed: false,
  showLikes: true,
	isCategoryOption: false,

	isContentLoaded: Em.computed(function() {

		//return this.getPath('content.isLoaded');
		return !!this.get('content');

	}).property('content'),

  templateName:"venues_tab_content"
});
