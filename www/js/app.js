
function shouldRotateToOrientation(degrees) {
  return true;
};

angular.module('ionicApp', ['ionic', 'ngLiveJournal',
    'AuthSrvc', 'AvatarSrvc', 'ConfSrvc', 'StorageSrvc', 'TextSrvc', 'UserSrvc',
    'MainRoute', 'AppCtrl', 'AppDrctv', 'MenuCtrl',
    'FeedCtrl', 'PostCtrl', 'FriendsFeedCtrl', 'FavouritesCtrl',
    'MessagesSrvc', 'MessagesCtrl', 'MessageListCtrl', 'MessageViewCtrl' ])

.run(function($ionicPlatform, ngLJService) {
  $ionicPlatform.ready(function() {
    ngLJService.set_config(false);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.config(['$compileProvider', '$ionicConfigProvider', '$logProvider',
    function ($compileProvider, $ionicConfigProvider, $logProvider) {
    $compileProvider.debugInfoEnabled(false);
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $logProvider.debugEnabled(true);
}]);
