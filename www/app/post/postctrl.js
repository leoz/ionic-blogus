
angular.module('PostCtrl', ['PostDrvs'])

.controller('PostController', function($scope, $stateParams, $log, ngLJService, AuthService, TextService, AvatarService) {
    $scope.journal = $stateParams.journal;
    $scope.postId = $stateParams.postId;
    $scope.post = {};
    
    $scope.getPost = function() {
        //log.debug('getPost');

        ngLJService.get_event(
            AuthService.get_username(),
            AuthService.get_authdata(),
            $scope.journal,
            $scope.postId
        ).then(function(response) {

            $scope.preProcessPost(response[0].events[0]);
            $scope.post = response[0].events[0];

        }, function(){});
    };
    
    $scope.getPost();
    
    $scope.preProcessPost = function(post) {
        if(!post['poster']) {
            post['poster'] = $scope.journal;
        }
        TextService.convert(post, 'subject');
        AvatarService.getAvatar(post, post.poster);
        TextService.convert(post, 'event', true);

        if(post.props) {
            if(post.props.taglist) {
                TextService.convert(post.props, 'taglist');
            }
            if(post.props.current_location) {
                TextService.convert(post.props, 'current_location');
            }
            if(post.props.current_mood) {
                TextService.convert(post.props, 'current_mood');
            }
        }
    };    
});

