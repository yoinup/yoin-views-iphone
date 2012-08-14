
Yvi.SettingScreenView = Yvi.ScreenView.extend({
  elementId: 'setting_screen',
  user: null,

  hasFacebook: false,
  hasTwitter: false,
  hasPhone: false,

  _userChanged: Em.computed(function() {

    var user = this.get('user');
    if ( !!user) {
      this.set('hasFacebook', user.get('fbChannel') );
      this.set('hasTwitter', user.get('twitterChannel') );
      this.set('hasPhone', user.getPath('phoneChannels.length') > 0 );
    }

  }).property('user')

});
