Yvi.CheckoutNotificationState = Yvi.BaseNavigatedState.extend(Yvi.CheckoutClose, Yn.FbAuth, {

	notifyFacebook: function(sm) {
    
    var self = this,
        link = 'http://www.invibe.me/';

    // esto no funciona en FB
    //FB.login( function(response) {

    console.log('login notify facebook....');

    var fbUser = App.inviteController.get('facebookUser');
    var fbId = (!!fbUser) ? fbUser.id : App.inviteController.get('user.fbChannel.id');

    FB.ui({ method: 'feed',
            to: fbId, 
            name: I18n.t('facebook_invitation_title'),
            description: I18n.t('facebook_invitation_description'),
            link: link,
            picture: 'https://s3-eu-west-1.amazonaws.com/yoincdn/Yoin_app_icon_clean.png'
      }, function(response) {

        if (response && response.post_id) {
          console.log('Post was published.');
        } else {
          console.log('Post was not published.');
        }

    });

    //}, {scope: 'publish_stream' } );


  }

});


