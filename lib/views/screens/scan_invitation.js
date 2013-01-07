
Yvi.ScanBarCodeView = Em.ContainerView.extend({
  invitation: null,
  tagName: 'img',

  didInsertElement: function() {
    this.draw(); //because of the execution order ( can be changed )
  },

  _changed: Em.observer( function(){

    // TODO: check this after register or update unexchangedInvitationController
    if ( this.get('size') ) {
      this.draw();
    }

  },'invitation'),

  draw: function() {
    var invitation = this.get('invitation'),
        text;
    if ( !!invitation ) {
      text = 'localizer';
    }

    text = 'localizer';
    //this.$().barcode(text, 'ean13');	
    this.$().JsBarcode(text,{width:1.8, height:100});	
  }

});

Yvi.ScanQrCodeView = Em.ContainerView.extend({

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
        invitation = this.get('invitation'),
        fg,
        bg,
        text;


    //fg = '#000'; fg = '#9C9190';
    fg = '#2B2B2B';
    bg = 'white';

    if ( !!invitation ) {
      //qr_text = invitation.get('id');
      text = 'localizer';
    }

    // remove canvas if it was already shown 
    var el = this.$('canvas');
    if ( el ) el.remove();
    
    // Only draw qrcode if the user is loaded
    this.$().qrcode( {foreground: fg, background: bg, width: size, height: size, text: text } );	

  }

});

Yvi.ScanInvitationScreenView = Yvi.ScreenView.extend({
	elementId: 'scan_invitation_screen',

	invitation: null

});
