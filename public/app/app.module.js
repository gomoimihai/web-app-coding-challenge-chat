/**
 * App main module
 */
(function(){
    'use strict';

    angular.module('challengeChat',[
        'ngMaterial',
        'ngMdIcons',
        'challengeChat.filters',
        'challengeChat.constants',
        'doowb.angular-pusher'
    ]);

    angular.module('challengeChat').config(configure);

    configure.$inject = ['$mdThemingProvider', 'pusherSetup_const', 'PusherServiceProvider'];

    function configure($mdThemingProvider, pusherSetup_const, PusherServiceProvider){
        PusherServiceProvider.setToken(pusherSetup_const.key).setOptions({});
        $mdThemingProvider
            .theme('default')
            .primaryPalette('light-blue')
            .accentPalette('orange');
    }
})();