// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var communicatorApp = angular.module('communicatorApp', ['ionic', 'validation', 'validation.rules'])


.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        // Force a plugins object and mock insomnia so it won't cause errors if it's not present
        if (!window.plugins) {
            window.plugins = {
                insomnia: {
                    allowSleepAgain: function() {},
                    keepAwake: function() {}
                }
            };
        }

        document.addEventListener('menubutton', function() { $rootScope.$broadcast('menuButtonPressed'); }, false);
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/home/menu.html'
    })
    .state('content', {
        url: '/content',
        abstract: true,
        templateUrl: 'templates/home/content.html'
    })
    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home/home.html',
                controller: 'homeCtrl'
            }
        }
    })
    .state('tutorialHome', {
        url: '/tutorial',
        parent: 'app.home'
    })
    .state('app.statistics', {
        url: '/statistics',
        views: {
            'menuContent': {
                templateUrl: 'templates/statistic/statistics.html',
                controller: 'statisticsCtrl'
            }
        }
    })
    .state('app.levelCards', {
        url: '/levelCards/:levelNumber',
        views: {
            'menuContent': {
                templateUrl: 'templates/level/levelCards.html',
                controller: 'levelCardsCtrl'
            }
        }
    })
    .state('tutorialLevelCards', {
        url: '/tutorial',
        parent: 'app.levelCards'
    })
    .state('content.levelSingleCard', {
        url: '/levelSingleCard/:id',
        views: {
            'content': {
                templateUrl: 'templates/level/levelSingleCard.html',
                controller: 'levelSingleCardCtrl'
            }
        }
    })
    .state('tutorialLevelSingleCard', {
        url: '/tutorial',
        parent: 'content.levelSingleCard'
    })
    .state('app.patternLock', {
        url: '/patternLock',
        views: {
            'menuContent': {
                templateUrl: 'templates/level/patternLock.html',
                controller: 'patternLockCtrl'
            }
        }
    })
    .state('tutorialPatternLock', {
        url: '/tutorial',
        parent: 'app.patternLock'
    })
    .state('app.basicRegistry', {
        url: '/basicRegistry',
        views: {
            'menuContent': {
                templateUrl: 'templates/registry/basicRegistry.html',
                controller: 'basicRegistryCtrl'
            }
        }
    })
    .state('tutorialBasicRegistry', {
        url: '/tutorial',
        parent: 'app.basicRegistry',
    })
    .state('app.advancedRegistry', {
        url: '/advancedRegistry',
        views: {
            'menuContent': {
                templateUrl: 'templates/registry/advancedRegistry.html',
                controller: 'advancedRegistryCtrl'
            }
        }
    })
    .state('app.cards', {
        url: '/cards',
        views: {
            'menuContent': {
                templateUrl: 'templates/card/cards.html',
                controller: 'cardsCtrl'
            }
        }
    })
    .state('app.singleCard', {
        url: '/singleCard/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/card/singleCard.html',
                controller: 'singleCardCtrl'
            }
        }
    })
    .state('app.receivers', {
        url: '/receivers',
        views: {
            'menuContent': {
                templateUrl: 'templates/receiver/receivers.html',
                controller: 'receiversCtrl'
            }
        }
    })
    .state('app.singleReceiver', {
        url: '/singleReceiver/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/receiver/singleReceiver.html',
                controller: 'singleReceiverCtrl'
            }
        }
    })
    .state('app.configuration', {
        url: '/configuration',
        views: {
            'menuContent': {
                templateUrl: 'templates/configuration/configuration.html'
            }
        }
    })
    .state('app.configurationCurrentUser', {
        url: '/configuration/user',
        views: {
            'menuContent': {
                templateUrl: 'templates/configuration/configurationCurrentUser.html',
                controller: 'configurationsCurrentUserCtrl'
            }
        }
    })
    .state('app.configurationSync', {
        url: '/configuration/sync',
        views: {
            'menuContent': {
                templateUrl: 'templates/configuration/configurationSync.html',
                controller: 'configurationSyncCtrl'
            }
        }
    })
    .state('app.configurationDeveloperTools', {
        url: '/configuration/developerTools',
        views: {
            'menuContent': {
                templateUrl: 'templates/configuration/configurationDeveloperTools.html',
                controller: 'configurationDeveloperToolsCtrl'
            }
        }
    })
    .state('app.configurationCredits', {
        url: '/configuration/credits',
        views: {
            'menuContent': {
                templateUrl: 'templates/configuration/configurationCredits.html'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
})


;