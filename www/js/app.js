// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var communicatorApp = angular.module('communicatorApp', ['ionic'])

.run(function($ionicPlatform) {
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
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/home/menu.html'
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
    .state('app.phaseCards', {
        url: '/phaseCards',
        views: {
            'menuContent': {
                templateUrl: 'templates/phase/phaseCards.html',
                controller: 'phaseCardsCtrl'
            }
        }
    })
    .state('app.phaseSingleCard', {
        url: '/phaseSingleCard/:cardTitle/:cardImg',
        views: {
            'menuContent': {
                templateUrl: 'templates/phase/phaseSingleCard.html',
                controller: 'phaseSingleCardCtrl'
            }
        }
    })
    .state('app.patternLock', {
        url: '/patternLock',
        views: {
            'menuContent': {
                templateUrl: 'templates/phase/patternLock.html',
                controller: 'patternLockCtrl'
            }
        }
    })
    .state('app.basicRegistry', {
        url: '/basicRegistry',
        views: {
            'menuContent': {
                templateUrl: 'templates/phase/basicRegistry.html',
                controller: 'basicRegistryCtrl'
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
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});