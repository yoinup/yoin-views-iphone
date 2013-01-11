
Yvi.SettingsScreenView = Yvi.ScreenView.extend({
  elementId: 'settings_screen',
  user: null,
  hasFacebook: false,

  hasPhone: Em.computed(function() {
    return false;
  }).property('user.phoneChannels'),

  hasTwitter: false,

  isCheckinOn: false


});
