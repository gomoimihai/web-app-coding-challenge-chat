
'use strict';

var challengeChatApp = angular.module('challengeChat',[
    'ngMaterial',
    'ngMdIcons',
    'doowb.angular-pusher',
    'luegg.directives'
    ]);

challengeChatApp.config(['$mdThemingProvider', 'PUSHER_OPTIONS', 'PusherServiceProvider',
    function($mdThemingProvider, PUSHER_OPTIONS, PusherServiceProvider){
        PusherServiceProvider.setToken(PUSHER_OPTIONS.key).setOptions({});

        $mdThemingProvider
        .theme('default')
        .primaryPalette('light-blue')
        .accentPalette('orange');
    }
]);
