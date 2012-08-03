App.InviteButtonView = Yn.InviteButtonView.extend({

  bTap: function() {

    this.get('manager').send('inviteProduct', this.get('selected') );

  }

});
