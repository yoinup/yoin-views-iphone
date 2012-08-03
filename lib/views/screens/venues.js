
App.VenuesCategoryButtonView = Em.View.extend( Yn.Btap, Yn.Icon, Yn.IsSelected, {
  classNames: ['category-button'],
  selectedBinding: Em.Binding.oneWay('App.categoryController.selected'),
  iconBinding: Em.Binding.oneWay('content.icon'),
  action: 'selectCategory',
  actionContentBinding: Em.Binding.oneWay('content')

});


App.VenuesGeoSwitchButton = Yn.LogoSwitchButtonView.extend({

  change: function( enabled ) {

    this.get('manager').send('changeGeopositionVisibility', enabled);

  }

});


App.VenuesTabView = Em.View.extend( Yn.Icon, App.TabOption, {
  classNames: ['venues-tab'],
  currentTabViewBinding: Em.Binding.oneWay('App.tabController.venuesTab')

});



App.VenuesScreenView = App.ScreenView.extend({

  elementId: 'venues_screen',

  screenContext: {
    manager: 'App.venuesManager'
  }

});
