Yvi.Qr2CodeView = Em.ContainerView.extend({

	invitation: null,

  didInsertElement: function() {
    this.set('size', this.$().width( ) );
    this.draw(); //because of the execution order ( can be changed )
  },

  _changed: Em.observer( function(){

    // TODO: check this after register or update unexchangedInvitationController
    if ( this.get('size') ) {
      this.draw();
    }

  },'invitation'),

  draw: function() {

    // TODO: use scale and align center
    var size = this.get('size'),
        user = this.get('user'),
        invitation = this.get('invitation'),
        invitations,
        hasInvitations,
        fg,
        bg,
        qr_text;


    //fg = '#000'; fg = '#9C9190';
    fg = '#2B2B2B';
    bg = 'white';

    if ( !!invitation ) {
      //qr_text = invitation.get('id');
      qr_text = 'localizer';
    }

    // remove canvas if it was already shown 
    var el = this.$('canvas');
    if ( el ) el.remove();
    
    // Only draw qrcode if the user is loaded
    this.$().qrcode( {foreground: fg, background: bg, width: size, height: size, text: qr_text } );	

    //console.log( 'QR: ' + qr_text );

  }

});

Yvi.Qr2ScreenView = Yvi.ScreenView.extend({
	elementId: 'qr2_screen',

	invitation: null,
  user: null

});
