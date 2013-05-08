
App.CheckoutView = Em.ContainerView.extend(Yn.Context, Yvi.Modal, {
  isHiddenBinding: Em.Binding.oneWay('App.modalController.checkoutHidden'),
	manager: 'App.checkoutManager',

  childViews: ['child'],
  child: Yvi.NavigationView.extend({
    pushIsAnimated: true,
    elementId: 'checkout-navigation',
    initViewClass: 'App.InviteScreenView'

  })

});
