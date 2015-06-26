
angular.module('MessageListCtrl', [])

.controller('MessageListController', function(mode, $rootScope, $scope, MessagesService) {

    $scope.emails = [];

    $scope.data = {
        showDelete: false,
        mode: mode,
        title: ''
    };

    $scope.setListData = function() {
        switch (mode) {
            case 'all':
                $scope.data.title = 'All';
                $scope.emails = MessagesService.getInboxEmails();
                break;
            case 'flagged':
                $scope.data.title = 'Flagged';
                $scope.emails = MessagesService.getInboxEmails();
                break;
            case 'sent':
                $scope.data.title = 'Sent';
                $scope.emails = MessagesService.getOutboxEmails();
                break;
            default:
                $scope.data.title = 'E-Mails';
        }
    };

    $scope.setListData();

    $scope.onEmailFlag = function(email, e) {
        email.flagged = !email.flagged;
        e.preventDefault();
        $rootScope.emailCounts.flaggedCount = MessagesService.getFlaggedEmailCount();
    };

    $scope.onEmailDelete = function(email) {
        $scope.emails.splice($scope.emails.indexOf(email), 1);
    };
});