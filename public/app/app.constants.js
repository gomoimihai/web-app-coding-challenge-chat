'use strict';

challengeChatApp.constant('APP_DETAILS', {
    appName: "Web app coding challenge chat"
}).constant('PUSHER_OPTIONS', {
    eventName: "new_message",
    channel: "chat-messages",
    key: "be0cb4958ed00f849ac9",
    apiUrl: "http://coding-challenges.dispatchertrucking.com:",
    port: "8080/"
});