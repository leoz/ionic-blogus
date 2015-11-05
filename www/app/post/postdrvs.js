angular.module('PostDrvs', ['ngLogExt'])
/*
.directive('img', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            element.wrap('<div class="blg-img-wrap"></div>');
        }
    };
})*/
.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])
.directive('ljEmbed', ['$log', '$compile', 'ngLJService', function($log, $compile, ngLJService) {
    var log = $log.context('ljEmbed');

    function link(scope, element, attrs) {

        //console.log(scope.post);

        log.debug('link: journal - ' + scope.journal +
                  ', postId - ' + scope.post.ditemid +
                  ', embed - ' + attrs.id);

        ngLJService.get_embed(
            scope.journal,
            scope.post.ditemid,
            attrs.id
        ).then(function(response) {
            log.debug('link: data ' + response);

            element[0].outerHTML = response;
            $compile(element.contents())(scope);

        }, function(){});

    };

    return {
        restrict: 'E',
        template: '<div class="blg-embed-wrap"><ion-spinner></ion-spinner></div>',
        link: link
    };
}]);