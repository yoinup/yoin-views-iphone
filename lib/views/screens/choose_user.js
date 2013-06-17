Yvi.ChooseUserOption = {
	facebook: 'facebook',
	yoin: 'yoin',
	nearby: 'nearby',
  contacts: 'contacts'
};

Yvi.ChooseUserBoxView = Em.View.extend({

	classNameBindings: ['noDisplayContent:display-none'],
	childs: Em.A([]),

	noDisplayContent: Em.computed(function() {
		return this.get('childs').every(function(item) {
			return !item.get('display');
		});
	}).property('childs.@each.display'),

	setupLastVisibleContent: function() {
		var lastView;
		this.get('childs').forEach(function(view) {
			view.set('isLastVisible', false);
			if ( view.get('display') ) {
				lastView = view;
			}
		});
		if ( !!lastView ) {
			lastView.set('isLastVisible', true);
		}
	}

});

Yvi.ChooseUserContentView = Em.View.extend(Yn.Btap, {
	classNames: ['has-tap'],
	classNameBindings: ['display:box-content-li-display:display-none', 'isLastVisible'],
	search: null,
	name: null,
	parentManager: null,
	isLastVisible: false,
	didInsertElement: function() {

		this._super();
		this.parentManager = this.nearestOfType(Yvi.ChooseUserBoxView);
		this.parentManager.get('childs').pushObject(this);

	},
	destroy: function() {
		this.parentManager.get('childs').removeObject(this);
		this._super();
	},
  _displayChanged: Em.observer(function(){
		// observers are fired on changed
		// and run.once schedules only to run once during current runloop
		Em.run.once(this.parentManager, this.parentManager.setupLastVisibleContent);
	}, 'display'),

	display: Em.computed(function(){
		var result = true,
				name = this.get('name'),
				search = this.get('search');

		if (!!search && !!name) {
			var regex = new RegExp(search,"i");
			result = regex.test(name);
		}
		return result;
	}).property('search', 'name')

});


Yvi.ChooseUserScreenView = Yvi.ScreenView.extend({
  elementId: 'choose-user-screen',

	option: null,

  user: null,

  yoinContent: null,
  facebookContent: null,
  nearsContent: null,
	locationActive: false,
	showNears: false,

	searchInput: null,
	searchInputDelayed: null,

  _options: Em.computed(function() {
		var result = Em.A([]);
		result.pushObject({'name': 'facebook', 'action': Yvi.ChooseUserOption.facebook});

    result.pushObject({'name': 'contacts', 'action': Yvi.ChooseUserOption.contacts});

		if (this.get('_hasYoinFriends')) {
			result.pushObject({'name': 'yoin', 'action': Yvi.ChooseUserOption.yoin});
		}


		if (this.get('showNears')) {
			result.pushObject({'name': 'nearby', 'action': Yvi.ChooseUserOption.nearby});
		}


		return result;
  }).property('_hasYoinFriends', 'showNears'),

  _hasYoinFriends: Em.computed(function() {
    return this.get('yoinContent.length') > 0;
  }).property('yoinContent.length')

});
