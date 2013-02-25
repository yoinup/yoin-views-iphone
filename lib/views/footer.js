Yvi.FooterOptionView = Em.View.extend( Yn.Icon, Yn.Btap, {


  classNames: ['tabs-bottom', 'footer-icon'],
  classNameBindings: ['isSelected'],

	currentTabView: null,

  isSelected: Em.computed(function(){

		return this.get('currentTabView') === this.get('tab');

  }).property('currentTabView', 'tab'),

  action: Em.computed(function() {

    var tab = this.get('tab');
    var value = tab.charAt(0).toUpperCase() + tab.slice(1);
    return 'goTo'+value;

  }).property()

});

Yvi.FooterView = Em.View.extend(Yn.Context, {
	
  elementId: 'footer',

	classNames: ['l-footer'],
	
  manager: null,

	currentTabView: null,
	
	templateName: 'footer'

});
