
Yvi.SettingsScreenView = Yvi.ScreenView.extend({
  elementId: 'settings_screen',
  user: null,
  hasFacebook: false,

  hasPhone: Em.computed(function() {
    //return this.getPath('user.phoneChannels.length') > 0;
    
    return false;
  }).property('user.phoneChannels'),

  hasTwitter: false


});
