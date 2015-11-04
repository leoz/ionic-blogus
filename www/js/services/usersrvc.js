
angular.module('UserSrvc', [])

.factory('UserService', function($http) {
    var BASE_URL = 'http://api.randomuser.me/';
    var items = [];

    return {
        GetUsers: function(count) {
            return $http.get(BASE_URL + '?results=' + count).then(function(response) {
                items = response.data.results;
                return items;
            });
        }
    };
});