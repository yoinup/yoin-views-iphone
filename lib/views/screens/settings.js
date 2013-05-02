
Yvi.SettingsScreenView = Yvi.ScreenView.extend({
  elementId: 'settings-screen',
  user: null,
  hasFacebook: false,
	setMinHeight: false,

  hasPhone: Em.computed(function() {
    return false;
  }).property('user.phoneChannels'),

  hasTwitter: false,

  notificationCounter: null,
  isCheckinOn: false


});
