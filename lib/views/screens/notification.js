Yvi.TouchHoldView = Em.View.extend({

  touchHoldOptions: {
    holdPeriod: 200,
    moveThreshold: 40
  },
  classNameBindings: ['isOn'],
  isOn: true,

  touchHoldEnd: function(recognizer) {

    this.set('isOn', !this.get('isOn') );
  }

});

Yvi.NotificationScreenView = Em.View.extend({
  elementId: 'touch-test',
  templateName: 'notification_screen'


});

/*
Yvi.NotificationScreenView = Yvi.ScreenView.extend({

  elementId: 'notification_screen'


});
*/

