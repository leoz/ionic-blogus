
angular.module('MenuCtrl', [])

.controller('MenuController', function($scope) {
    $scope.main = {
        show_list: 'bookmarks',
        show_delete: false
    };
});

