angular.module('MessageViewCtrl', [])

.controller('MessageViewController', function(mode, $stateParams, $scope, $timeout, MessagesService) {
    if (mode == 'sent') {
        $scope.email = MessagesService.getOutboxEmail($stateParams.id);
    } else {
        $scope.email = MessagesService.getInboxEmail($stateParams.id);
    }
    $timeout(function() {
        $scope.email.was_read = true;
    }, 500);
});