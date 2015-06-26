
angular.module('PostCtrl', [])

.controller('PostController', function($scope, $stateParams, UserService) {
    $scope.post = {};
    UserService.GetUsers(1).then(function(items) {
        $scope.post = items[0];
    });
    //$scope.post = JournalSrvc.get($stateParams.postId);
});

