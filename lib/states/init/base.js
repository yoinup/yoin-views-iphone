Yvi.InitBaseState = Em.State.extend({

  // user should be logged
  insertAppView: function(sm, hideSplashScreen, next) {

		App.buildPrerenderViews();
    var self = this;

		this.initLoggedManagers( function() {
      sm.appContainerView = App.AppContainerView.create({});
      sm.appContainerView.on('didInsertElement', function() {

        App.walletManager.set('navigationView', Em.View.views['wallet-navigation'] );
        App.meManager.set('navigationView', Em.View.views['settings-navigation'] );
        App.venuesManager.set('navigationView', Em.View.views['venues-navigation']);
        App.checkoutManager.set('navigationView', Em.View.views['checkout-navigation']);
        App.notificationsManager.set('navigationView', Em.View.views['notifications-navigation']);

        if ( App.isNative && hideSplashScreen ) {

          // This is a big performance benefit
          Ember.run.schedule('afterRender', function() {
            navigator.splashscreen.hide();
          });


        }

        App.contentController.set('chooseUser', true);

        // there is not a big performance benefit on that
        //App.contentController.set('appContainer', true);

        if ( !!next ) {
          next();
        }
        App.trigger('didShowLoginScreen');
          
      });

      App.appendToRoot(sm.appContainerView);

    });

  },

	initLoggedManagers: function(next) {

    var tabInitialState = 'venues', 
        venuesInitialState = 'venues', 
        checkoutInitialState = 'closed', 
        chooseUserInitialState = 'closed', 
        walletInitialState = 'wallet', 
        notificationsInitialState = 'closed', 
        meInitialState = 'settings';

    var fn = function() {

      if ( !App.tabManager ) {

        var enableLogging = App.settings.enableManagerLogging;
        // user is already logged
        App.tabManager = App.TabManager.create({
          enableLogging: enableLogging,
          initialState: tabInitialState
        });
        App.venuesManager = App.VenuesManager.create({
          enableLogging: enableLogging,
          initialState: venuesInitialState
        });
        App.meManager = App.MeManager.create({
          enableLogging: enableLogging,
          initialState: meInitialState
        });
        App.checkoutManager = App.CheckoutManager.create({
          enableLogging: enableLogging,
          initialState: checkoutInitialState
        });
        App.walletManager = App.WalletManager.create({
          enableLogging: enableLogging,
          initialState: walletInitialState
        });
        App.chooseUserManager = App.ChooseUserManager.create({
          enableLogging: enableLogging,
          initialState: chooseUserInitialState
        });
        App.notificationsManager = App.NotificationsManager.create({
          enableLogging: enableLogging,
          initialState: notificationsInitialState
        });

      } else {

        App.walletManager.goToState( walletInitialState ); 
        App.tabManager.goToState( tabInitialState ); 
        App.venuesManager.goToState( venuesInitialState ); 
        App.meManager.goToState( meInitialState ); 
        App.checkoutManager.goToState( checkoutInitialState ); 
        App.notificationsManager.goToState( notificationsInitialState ); 
        App.chooseUserManager.goToState( chooseUserInitialState ); 

      }
      next();

    };

    fn();

	}

});
