
angular.module('FriendsFeedCtrl', [])

.controller('FriendsFeedController', function($scope, UserService) {
    $scope.journal = 'posts';
    $scope.title = 'Friends';
    $scope.mode = 'friends';
    $scope.posts = [];
    UserService.GetUsers(20).then(function(items) {
        $scope.posts = items;
    });
})
