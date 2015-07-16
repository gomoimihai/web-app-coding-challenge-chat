/**
 * ChatBoxService Factory
 * @namespace Factory
 */
challengeChatApp.factory('ChatBoxService', ['$q', '$http', 'PUSHER_OPTIONS', function ($q, $http, PUSHER_OPTIONS) {
    'use strict';
    /**
     * @namespace ChatBoxService
     * @desc Chat Box Service
     * @memberOf Factory
     */
    var apiUrl = PUSHER_OPTIONS.apiUrl + PUSHER_OPTIONS.port + PUSHER_OPTIONS.channel;
    /**
     * @name getAllMessages
     * @desc Get all messages
     * @param {undefined}
     * @returns {promise}
     * @memberOf Factory.ChatBoxService
     */
    function getAllMessages() {
        return $q(function (resolve, reject) {
            $http.get(apiUrl).then(function (result) {
                if (!result.data || !result.data.length) {
                    resolve([]);
                } else {
                    resolve(result.data);
                }
            }, function (reason) {
                reject(reason);
            });
        });
    }
    /**
     * @name sendMessage
     * @desc Send message
     * @param {String, String, String}
     * @returns {undefiend}
     * @memberOf Factory.ChatBoxService
     */
    function sendMessage(message, user, email) {
        $http.post(apiUrl, {
            user: user,
            text: message,
            email: email
        });
    }

    return {
        getAllMessages: getAllMessages,
        sendMessage: sendMessage
    };
}]);
