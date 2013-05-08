
App.InviteScreenView = Yvi.InviteScreenView.extend({

  manager: 'App.checkoutManager',

  inputValueBinding: 'App.inputsController.inviteComment',
  invitationBinding: Em.Binding.oneWay('App.inviteController.invitation'),
  venueBinding: Em.Binding.oneWay('App.inviteController.venue'),
  venuesBinding: Em.Binding.oneWay('App.inviteController.venues'),
  productBinding: Em.Binding.oneWay('App.inviteController.product'),

  userBinding: Em.Binding.oneWay('App.inviteController.user'),
  facebookUserBinding: Em.Binding.oneWay('App.inviteController.facebookUser'),
  agendaUserBinding: Em.Binding.oneWay('App.inviteController.agendaUser'),
  usernameBinding: Em.Binding.oneWay('App.inviteController.username'),

  isExecutingActionBinding: Em.Binding.oneWay('App.inviteController.isExecutingAction')

});
