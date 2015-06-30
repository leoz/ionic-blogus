
angular.module('MessagesCtrl', [])

.controller('MessagesController', function($scope, $rootScope, MessagesService) {
     $rootScope.emailCounts = {
          inboxCount: MessagesService.getInboxEmailCount(),
          flaggedCount: MessagesService.getFlaggedEmailCount(),
          sentCount: MessagesService.getOutboxEmailCount()
     };
});