
angular.module('MainRoute', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/menu/menu.html',
        controller: 'AppController'
    })

    .state('app.tab', {
        url: '/tab',
        abstract: true,
        views: {
            'menu-content': {
                templateUrl: 'app/menu/tabs.html'
            },
            'menu-left': {
                templateUrl: 'app/menu/menu-auth.html',
                controller: 'MenuController'
            }
        }
    })

    .state('app.journal', {
        url: '/journal/:journal',
        views: {
            'menu-content': {
                templateUrl: 'app/feed/tab-feed.html',
                controller: 'FeedController'
            },
            'menu-left': {
                templateUrl: 'app/menu/menu-anon.html'
            }
        }
    })

    .state('app.journal-post', {
        url: '/journal/:journal/:postId',
        views: {
            'menu-content': {
                templateUrl: 'app/post/view-post.html',
                controller: 'PostController'
            }
        }
    })

    .state('app.tab.journal', {
        url: '/journal/:journal',
        views: {
            'tab-journal': {
                templateUrl: 'app/feed/tab-feed.html',
                controller: 'FeedController'
            }
        }
    })

    .state('app.tab.journal-post', {
        url: '/journal/:journal/:postId',
        views: {
            'tab-journal': {
                templateUrl: 'app/post/view-post.html',
                controller: 'PostController'
            }
        }
    })

    .state('app.tab.friends', {
        url: '/friends/posts',
        views: {
            'tab-friends': {
                templateUrl: 'app/feed/tab-feed.html',
                controller: 'FriendsFeedController'
            }
        }
    })

    .state('app.tab.friends-post', {
        url: '/friends/posts/:postId',
        views: {
            'tab-friends': {
                templateUrl: 'app/post/view-post.html',
                controller: 'PostController'
            }
        }
    })

    .state('app.tab.favourites', {
        url: '/favourites',
        views: {
            'tab-favourites': {
                templateUrl: 'app/favourites/tab-favourites.html',
                controller: 'FavouritesController'
            }
        }
    })

    .state('app.tab.messages', {
        url: '/messages',
        views: {
            'tab-messages': {
                templateUrl: 'app/messages/tab-messages.html',
                controller: 'MessagesController'
            }
        }
    })

    .state('app.tab.messages.all', {
        url: '/all',
        views: {
            'tab-messages-all': {
                templateUrl: 'app/messages/tab-message-list.html',
                controller: 'MessageListController'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.messages.all-view', {
        url: '/all/:id',
        views: {
            'tab-messages-all': {
                templateUrl: 'app/messages/view-message.html',
                controller: 'MessageViewController'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.messages.sent', {
        url: '/sent',
        views: {
            'tab-messages-sent': {
                templateUrl: 'app/messages/tab-message-list.html',
                controller: 'MessageListController'
            }
        },
        resolve: {
            mode: function() {
                return 'sent';
            }
        }
    })

    .state('app.tab.messages.sent-view', {
        url: '/sent/:id',
        views: {
            'tab-messages-sent': {
                templateUrl: 'app/messages/view-message.html',
                controller: 'MessageViewController'
            }
        },
        resolve: {
            mode: function() {
                return 'sent';
            }
        }
    })

    .state('app.tab.messages.flagged', {
        url: '/flagged',
        views: {
            'tab-messages-flagged': {
                templateUrl: 'app/messages/tab-message-list.html',
                controller: 'MessageListController'
            }
        },
        resolve: {
            mode: function() {
                return 'flagged';
            }
        }
    })

    .state('app.tab.messages.flagged-view', {
        url: '/flagged/:id',
        views: {
            'tab-messages-flagged': {
                templateUrl: 'app/messages/view-message.html',
                controller: 'MessageViewController'
            }
        },
        resolve: {
            mode: function() {
                return 'flagged';
            }
        }
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        var path = '/app/journal/';
        var cs = $injector.get('ConfService');
        var as = $injector.get('AuthService');
        if (as.get_logged_in()) {
            path = '/app/tab/journal/';
        }
        $location.path(path + cs.current);
    });

});
