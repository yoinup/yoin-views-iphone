App.QrCodeView = Em.ContainerView.extend({

	childViews: ['child_qr'],
	classNames: ['center'],

	unexchangedInvitationsBinding: Em.Binding.oneWay('App.unexchangedInvitationController.content'),
	classNameBindings: ['isUnexchangedInvitation'],

	isUnexchangedInvitation: Em.computed(function(){

		var invitations = this.getPath('unexchangedInvitations');
		return (invitations) ? invitations.get('length') > 0 : false;

	}).property('unexchangedInvitations.length'),

	child_qr: Em.ContainerView.extend({ 

    elementId: 'qr-code',
    userBinding: Em.Binding.oneWay('App.loginUserController.content'),
    isRegisteredBinding: Em.Binding.oneWay('App.loginUserController.isRegistered'),
    unexchangedInvitationsBinding: Em.Binding.oneWay('App.unexchangedInvitationController.content'),


		didInsertElement: function() {
			this.set('size', this.$().width( ) );
			this.draw(); //because of the execution order ( can be changed )
		},

		_changed: Em.observer( function(){

			// TODO: check this after register or update unexchangedInvitationController
			if ( this.get('size') ) {
				this.draw();
			}

		},'unexchangedInvitations', 'user'),

		draw: function() {

			// TODO: use scale and align center
			var size = this.get('size'),
					user = this.get('user'),
					invitations,
					hasInvitations,
					fg,
					bg,
					qr_text;

			invitations = this.get('unexchangedInvitations');
			hasInvitations = (invitations) ? invitations.get('length') > 0 : false;

			//Check if the user has pending invitations
			if (hasInvitations) {
				fg = '#000';
			}
			else {
				fg =( this.get('isRegistered') ) ? '#2B2B2B' :'#9C9190' ;
			}
			bg = 'white';

			qr_text = (user && user.get('id') !== undefined) ? user.get('id').toString() : 'fake'; 

			// remove canvas if it was already shown 
			var el = this.$('canvas');
			if ( el ) el.remove();
			
			// Only draw qrcode if the user is loaded
			this.$().qrcode( {foreground: fg, background: bg, width: size, height: size, text: qr_text } );	

			console.log( 'Size: ' + size );
			console.log( 'QR: ' + qr_text );
			console.log( 'User: ' + user.showName );
			console.log( 'Invitations: ' + invitations );

		}


	})

	/*child_description: Yn.UnboundView.extend({

    classNames: ['qr-description']

  })*/

});


App.QrScreenView = App.ScreenView.extend({
	elementId: 'qr_screen'

});
