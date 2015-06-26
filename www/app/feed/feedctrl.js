
angular.module('FeedCtrl', [])

.controller('FeedController', function($scope, $stateParams, UserService) {
    $scope.journal = $stateParams.journal;
    $scope.title = 'Journal - ' + $scope.journal;
    $scope.mode = 'journal';
    $scope.posts = [];
    UserService.GetUsers(20).then(function(items) {
        $scope.posts = items;
    });
    $scope.doRefresh = function() {
        UserService.GetUsers(1).then(function(items) {
            $scope.posts = items.concat($scope.posts);
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.loadMore = function() {
        UserService.GetUsers(10).then(function(items) {
            $scope.posts = $scope.posts.concat(items);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
});