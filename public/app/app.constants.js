/**
 * App constants initialization
 */
(function(){
    'use strict';

    angular.module('challengeChat.constants', [])
        .constant('appDetails_const', {
            appName: 'Web app coding challenge chat'
        })
        .constant('pusherSetup_const', {
            eventName: "new_message",
            channel: "chat-messages",
            key: "be0cb4958ed00f849ac9",
            apiUrl: "http://coding-challenges.dispatchertrucking.com:",
            port: "8080/"
        });
})();