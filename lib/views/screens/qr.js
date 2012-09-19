Yvi.QrCodeView = Em.ContainerView.extend({

	selectedUnexchangedInvitation: null,
  user: null,

  didInsertElement: function() {
    this.set('size', this.$().width( ) );
    this.draw(); //because of the execution order ( can be changed )
  },

  _changed: Em.observer( function(){

    // TODO: check this after register or update unexchangedInvitationController
    if ( this.get('size') ) {
      this.draw();
    }

  },'user', 'user.unexchangedInvitationsCount', 'selectedUnexchangedInvitation'),

  draw: function() {

    // TODO: use scale and align center
    var size = this.get('size'),
        user = this.get('user'),
        invitation = this.get('selectedUnexchangedInvitation'),
        invitations,
        hasInvitations,
        fg,
        bg,
        qr_text;


    //user.unexchangedInvitationsCount
    if (hasInvitations) {
    }

    //fg = '#000'; fg = '#9C9190';
    fg = '#2B2B2B';
    bg = 'white';

    if ( !!invitation ) {
      qr_text = 'i-'+invitation.get('id');
    } else if ( !!user )  {
      qr_text = 'u-'+user.get('id');
    } else {
      qr_text = 'fake';
    }

    // remove canvas if it was already shown 
    var el = this.$('canvas');
    if ( el ) el.remove();
    
    // Only draw qrcode if the user is loaded
    this.$().qrcode( {foreground: fg, background: bg, width: size, height: size, text: qr_text } );	

    //console.log( 'QR: ' + qr_text );

  }

});

Yvi.QrScreenView = Yvi.ScreenView.extend({
	elementId: 'qr_screen',

	selectedUnexchangedInvitation: null,
  user: null


});
