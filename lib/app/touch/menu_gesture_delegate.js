
App.menuGestureDelegate = Em.GestureDelegate.create({
  name: 'menu_gesture_delegate',


  shouldReceiveTouch: function(gesture, view, event) {

    var result = true;

    if ( view instanceof App.TabMainView ) {
      result = App.asideController.get('menu');
    } else if ( App.asideController.get('menu') ) {
      result = false;
    }

    return result; 
  }

});
