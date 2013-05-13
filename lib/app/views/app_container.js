
App.AppContainerView = Em.View.extend(Yn.AsideContainer, {
  elementId: 'app-container',
  classNames: ['app-container', 'has-aside-left', 'is-aside-big'],
  //isAsideLeftBinding: Em.Binding.oneWay('App.asideController.menu'),

  templateName: 'app_container'

});
