
angular.module('AppCtrl', [])

.controller('AppController', function($scope, UserService, AuthService, ConfService) {
    $scope.placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    $scope.bookmarks = [];
    UserService.GetUsers(5).then(function(items) {
        $scope.bookmarks = items;
    });
    $scope.friends = [];
    UserService.GetUsers(7).then(function(items) {
        $scope.friends = items;
    });
    $scope.groups = [];
    UserService.GetUsers(3).then(function(items) {
        $scope.groups = items;
    });
    $scope.auth = AuthService;
    $scope.conf = ConfService;
    $scope.user = {
        name: 'Marty McFly',
        icon: 'http://ionicframework.com/img/docs/mcfly.jpg'
    }
});

