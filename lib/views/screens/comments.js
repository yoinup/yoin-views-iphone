
Yvi.CommentInputView = Em.View.extend(Yn.Input, {

  elementId: 'comments-input',

  classNames: ['single-input'],

  placeholder: Em.computed(function()  {
    return I18n.t('write_something_message');
  }).property(),

  type: 'text'

});

Yvi.CommentsScreenView = Yvi.ScreenView.extend({
  elementId: 'comments_screen',

  product: null,
  venue: null,

  activities: null

});
