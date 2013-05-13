
App.menuGestureDelegate = Em.GestureDelegate.create({
  name: 'menu_gesture_delegate',


  shouldReceiveTouch: function(gesture, view, event) {

    var menu = App.asideController.get('menu');
    if ( view instanceof App.TabMainView ) {
      return menu;
    } else {
      return !menu;
    }

  }

});
