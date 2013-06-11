Yvi.CheckoutNotificationState = Yvi.BaseNavigatedState.extend(Yvi.CheckoutClose, Yn.FbAuth, {

	notifyFacebook: function(sm) {
    
    var self = this,
        link = 'http://www.invibe.me/';

    // esto no funciona en FB
    //FB.login( function(response) {
    var fbUser = App.inviteController.get('facebookUser');
    var fbId = (!!fbUser) ? fbUser.id : App.inviteController.get('user.fbChannel.id');

    FB.ui({ method: 'feed',
            to: fbId, 
            name: I18n.t('facebook_invitation_title'),
            description: I18n.t('facebook_invitation_description'),
            link: link,
            picture: 'https://s3-eu-west-1.amazonaws.com/yoincdn/Invibe_app_icon_clean.png'
      }, function(response) {
        if (response && response.post_id) {
          console.log('Post was published.');
        } else {
          console.log('Post was not published.');
        }
    });

    //}, {scope: 'publish_stream' } );
  },

	notifyEmail: function(sm) {

    var invitation = App.inviteController.get('successInvitation'),
        code = invitation.get('code');

    var subject = I18n.t('email_invitation_title');
    // TODO i18n
    var content = "Hi!,<br></br> I´ve just sent an invitation. To redeem it, download the app at <a href=\"http:\/\/www.invibe.me\/app\/\">Invibe</a> or show this code <b>" +code+ "</b> to the bartender at " +invitation.get('venue.name') + ".";

    var agendaUser = App.inviteController.get('agendaUser'),
        email = (!!agendaUser) ? agendaUser.email : null;

    if ( App.isAndroid ) {
      window.plugins.emailComposer.showEmailComposer(subject, content, email, null, null, true);
    } else {
      window.plugins.emailComposer.showEmailComposerWithCB(function(result){
          if (result === 0) {
            console.log("Cancelled");
          } else if(result === 1) {
            console.log("Saved");
          } else if(result === 2) {
            console.log("Sent.");
          } else if(result === 3) {
            console.log("Failed.");
          } else if(result === 4) {
            console.log("Not Sent.");
          }
      }, subject, content, email, null, null, true);
    }

  },

	notifyPhone: function(sm) {

    var self = this,
        invitation = App.inviteController.get('successInvitation'),
        code = invitation.get('code'),
        agendaUser = App.inviteController.get('agendaUser'),
        phone = (!!agendaUser) ? agendaUser.phone : null;

    var content = "I´ve just sent an invitation. To redeem it, download the app at http:\/\/www.invibe.me\/app\/ or show this code " +code+ " to the bartender at " +invitation.get('venue.name') + ".";

    if ( App.isAndroid ) {

    } else {

      var sms_text = I18n.t('sms_invitation_text');

      window.plugins.smsComposer.showSMSComposerWithCB(function(result){

          if (result === 0) {
            console.log("Cancelled");
          } else if(result === 1) {
            console.log("Sent");
          } else if(result === 2) {
            console.log("Failed.");
          } else if(result === 3) {
            console.log("Not Sent.");
          }

      }, phone, content);

    }

  }

});
