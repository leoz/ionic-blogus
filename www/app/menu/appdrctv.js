
angular.module('AppDrctv', [])

.directive('navClear', [
    '$ionicViewService',
    '$state',
    '$location',
    '$window',
    '$rootScope',
    function($ionicHistory, $location, $state, $window, $rootScope) {
        $rootScope.$on('$stateChangeError', function() {
            $ionicHistory.nextViewOptions(null);
        });
        return {
            priority: 100,
            restrict: 'AC',
            compile: function($element) {
                return {
                    pre: prelink
                };

                function prelink($scope, $element, $attrs) {
                    var unregisterListener;

                    function listenForStateChange() {
                        unregisterListener = $scope.$on('$stateChangeStart', function() {
                            $ionicHistory.nextViewOptions({
                                disableAnimate: true,
                                disableBack: true
                            });
                            unregisterListener();
                        });
                        $window.setTimeout(unregisterListener, 300);
                    }

                    $element.on('click', listenForStateChange);
                }
            }
        };
    }
])

.directive('actualSrc', function() {
    return {
        link: function postLink(scope, element, attrs) {
            attrs.$observe('actualSrc', function(newVal, oldVal) {
                if (newVal !== undefined) {
                    var img = new Image();
                    img.src = attrs.actualSrc;
                    angular.element(img).bind('load', function() {
                        element.attr("src", attrs.actualSrc);
                    });
                }
            });
        }
    };
});