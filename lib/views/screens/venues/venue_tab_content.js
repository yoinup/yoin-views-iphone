
App.VenuesScrollView = Yn.ScrollerView.extend({
  holdPeriod: 2000,

  didBottomRefresh: function() {

    this.manager.send('refresh');

  }

});

//geopositionIsOnBinding="App.geopositionController.isOn"

App.VenuesTabContentView = Em.View.extend({
  classNames:['venues-tab-content'],
  content: null,
  isRefreshed: false,
  showLikes: false,
  templateName:"venues_tab_content"
});
