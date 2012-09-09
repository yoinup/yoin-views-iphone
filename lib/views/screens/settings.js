
Yvi.SettingsScreenView = Yvi.ScreenView.extend({
  elementId: 'settings_screen',
  user: null,
/*
  hasFacebook: Em.computed(function() {
    return true;
    //return !!this.getPath('user.fbChannel');
  }).property('user.fbChannel'),
  */
  hasFacebook: true,

  hasPhone: Em.computed(function() {
    //return this.getPath('user.phoneChannels.length') > 0;
    
    return false;
  }).property('user.phoneChannels'),

  hasTwitter: false


});
