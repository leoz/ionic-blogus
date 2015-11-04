
angular.module('FeedCtrl', [])

.controller('FeedController', function ($scope, $stateParams, ngLJService, TextService, AvatarService) {

    $scope.journal = $stateParams.journal;
    $scope.username = null;
    $scope.authdata = null;
    $scope.count = 20;
    $scope.date = null;
    ngLJService.set_config(false);

    $scope.title = 'Journal - ' + $scope.journal;
    $scope.mode = 'journal';
    $scope.posts = [];

    $scope.loadFirst = function () {
        ngLJService.get_events($scope.username, $scope.authdata, $scope.journal, $scope.count, $scope.date).then(function (response) {
            $scope.preProcessPosts(response[0].events);
            $scope.posts = response[0].events;
        }, function (reason) {
        });
    };
    $scope.loadFirst();
    
    $scope.doRefresh = function () {
        ngLJService.get_events($scope.username, $scope.authdata, $scope.journal, 1, null).then(function (response) {
            $scope.preProcessPosts(response[0].events);
            $scope.posts = _.union($scope.posts, response[0].events);
            //$scope.posts = response[0].events.concat($scope.posts);
            $scope.$broadcast('scroll.refreshComplete');
        }, function (reason) {
        });
    };
    
    $scope.loadMore = function () {
        $scope.setLastDate();
        ngLJService.get_events($scope.username, $scope.authdata, $scope.journal, $scope.count, $scope.date).then(function (response) {
            $scope.preProcessPosts(response[0].events);
            $scope.posts = $scope.posts.concat(response[0].events);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (reason) {
        });
    };
    
    $scope.setLastDate = function () {
        if($scope.posts && $scope.posts.length) {
            var new_date = $scope.posts[$scope.posts.length - 1].logtime;
            if ($scope.date == new_date) {
                /// TBD
                return;
            }
            $scope.date = new_date;
        }    
    };
    
    $scope.preProcessPosts = function(posts) {
        for (var i = 0; i < posts.length; i++) {
            if(!posts[i]['poster']) {
                posts[i]['poster'] = $scope.journal;
            }
            TextService.convert(posts[i], 'subject');
            AvatarService.getAvatar(posts[i], posts[i].poster);
        }
    };    
});