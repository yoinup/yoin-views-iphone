
Yvi.FooterOptionView = Em.View.extend( Yn.Icon, Yn.Btap, {

	manager: null,
  classNames: ['tabs-bottom', 'footer-icon'],
  classNameBindings: ['isSelected'],

	currentTabView: null,
	isQrSelected: true,

  isSelected: Em.computed(function(){

		return this.get('isQrSelected') ? false : this.get('currentTabView') === this.get('tab');

  }).property('currentTabView', 'tab', 'isQrSelected'),

  action: Em.computed(function() {

    var tab = this.get('tab');
    var value = tab.charAt(0).toUpperCase() + tab.slice(1);
    return 'goTo'+value;

  }).property()

});

Yvi.FooterQrOptionView = Em.View.extend(Yn.Btap, Yn.Icon, {

	manager: null,
  classNames: ['tabs-bottom', 'footer-icon'],
  classNameBindings: ['isSelected'],

	currentTabView: null,
	isQrSelected: true,

  isSelected: Em.computed(function(){
		return this.get('isQrSelected');
  }).property('isQrSelected'),

	icon: Em.computed(function() {

		return this.get('isQrSelected') ? 'D' : 'E';

	}).property('isQrSelected'),

  action: Em.computed(function() {

                return this.get('isQrSelected') ? 'close' : 'goToQr';

  }).property('isQrSelected')

});

Yvi.FooterView = Em.View.extend({
	
  elementId: 'footer',

	classNames: ['l-footer'],
	
  manager: null,

	currentTabView: null,
	isQrHidden: true,

	isQrSelected: Em.computed(function() {

		return !this.get('isQrHidden');

	}).property('isQrHidden'),
	
	templateName: 'footer'

});
