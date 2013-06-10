

// screenView
Yvi = {};

require('yoin-views-iphone/utils/application');

require('yoin-views-iphone/system/mixins/update_user');
require('yoin-views-iphone/system/application');

//-------------------------------------------- states
require('yoin-views-iphone/states/state_manager');

require('yoin-views-iphone/states/mixins/navigation_back_event');
require('yoin-views-iphone/states/mixins/invite_product_event');
require('yoin-views-iphone/states/mixins/go_to_menu');

require('yoin-views-iphone/states/base_navigated');
require('yoin-views-iphone/states/base_modal');

require('yoin-views-iphone/states/checkout/mixins/close');
require('yoin-views-iphone/states/checkout/mixins/enter_choose');
require('yoin-views-iphone/states/checkout/notification');
require('yoin-views-iphone/states/checkout/closed');
require('yoin-views-iphone/states/checkout/invite');

require('yoin-views-iphone/states/tab/base');

require('yoin-views-iphone/states/choose_user/closed');
require('yoin-views-iphone/states/choose_user/friends');


require('yoin-views-iphone/states/me/settings');
require('yoin-views-iphone/states/me/about');
require('yoin-views-iphone/states/me/edit_settings');
require('yoin-views-iphone/states/me/legal');
require('yoin-views-iphone/states/me/user_status');

require('yoin-views-iphone/states/venues/friends_nearby');
require('yoin-views-iphone/states/venues/map');
require('yoin-views-iphone/states/venues/venues');

require('yoin-views-iphone/states/notifications/notifications');
require('yoin-views-iphone/states/notifications/closed');

require('yoin-views-iphone/states/wallet/wallet');

require('yoin-views-iphone/states/commons/map');
require('yoin-views-iphone/states/commons/terms');
require('yoin-views-iphone/states/commons/invitation');
require('yoin-views-iphone/states/commons/scan_invitation');

require('yoin-views-iphone/states/init/base');
require('yoin-views-iphone/states/init/logged');
require('yoin-views-iphone/states/init/unlogged');

//---------------------------------------------


require('yoin-views-iphone/views/api/screen');
require('yoin-views-iphone/views/api/modal');
require('yoin-views-iphone/views/api/navigation');


require('yoin-views-iphone/views/uis/box_content/select_item');
require('yoin-views-iphone/views/uis/box_content/invite_user');


require('yoin-views-iphone/views/mixins/has_user');

require('yoin-views-iphone/views/map');

require('yoin-views-iphone/views/screens/venues');
require('yoin-views-iphone/views/screens/scan_invitation');
require('yoin-views-iphone/views/screens/invitation');

require('yoin-views-iphone/views/screens/notification');
require('yoin-views-iphone/views/screens/notifications');
require('yoin-views-iphone/views/screens/legal');
require('yoin-views-iphone/views/screens/menu');
require('yoin-views-iphone/views/screens/terms');
require('yoin-views-iphone/views/screens/about');
require('yoin-views-iphone/views/screens/wallet');
require('yoin-views-iphone/views/screens/categories');
require('yoin-views-iphone/views/screens/invite');
require('yoin-views-iphone/views/screens/user_status');
require('yoin-views-iphone/views/screens/settings');
require('yoin-views-iphone/views/screens/edit_settings');
require('yoin-views-iphone/views/screens/login');
require('yoin-views-iphone/views/screens/choose_user');
require('yoin-views-iphone/views/screens/friends_nearby');

require('yoin-views-iphone/views/screens/map');


require('yoin-views-iphone/controllers/map_venues');
require('yoin-views-iphone/controllers/category');
require('yoin-views-iphone/controllers/facebook');
require('yoin-views-iphone/controllers/friends');
require('yoin-views-iphone/controllers/geoposition');
require('yoin-views-iphone/controllers/invite');
require('yoin-views-iphone/controllers/login_user');
require('yoin-views-iphone/controllers/venues');
require('yoin-views-iphone/controllers/wallet');
require('yoin-views-iphone/controllers/near_users');
require('yoin-views-iphone/controllers/notifications');
