angular.module('CommentsCtrl', [])

.controller('CommentsController', function($scope, $stateParams, $log, ngLJService, AuthService, TextService, AvatarService) {

	var log = $log.context('CmtCtrl');
    $scope.journal = $stateParams.journal;
    $scope.postId = $stateParams.postId;
    
    $scope.child = {};
    
    $scope.getComments = function() {
        log.debug('getComments');
        //$scope.loading.comments = true;
        ngLJService.get_comments(
            AuthService.get_username(),
            AuthService.get_authdata(),
            $scope.journal,
            $scope.postId
        ).then(function(response) {
            //$scope.error = false;
            $scope.child.children = response[0].comments;
            $scope.preProcessComments($scope.child);
            //$scope.loading.comments = false;
        }, function(){$scope.error = true;});
    };
    
    $scope.getComments();

    $scope.preProcessComments = function(child) {
        for (var i = 0; i < child.children.length; i++) {
            TextService.convert(child.children[i], 'subject');
            TextService.convert(child.children[i], 'body');
            AvatarService.getAvatar(child.children[i], child.children[i].postername);
        }
    };
});
