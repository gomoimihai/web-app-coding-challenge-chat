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
     * @name formatMessageObj
     * @desc Formats message object
     * @param {Object} m Message to format
     * @returns {Object}
     * @memberOf Directives.chatBox
     */
    function formatMessageObj(m) {
        var who = m.user !== undefined ? m.user : 'Anonymous',
            notes = m.text !== undefined ? m.text : '',
            date = m.time !== undefined ? m.time : '',
            email = m.email !== undefined ? m.email : 'example@example.com',
            imagePath = 'https://robohash.org/',
            imageType = '.png',
            face;
        face = imagePath + email + imageType;

        return {
            who: who,
            notes: notes,
            date: date,
            face: face
        };
    }

    /**
     * @name getAllMessages
     * @desc Get all messages
     * @param {undefined}
     * @returns {promise}
     * @memberOf Factory.ChatBoxService
     */
    function getAllMessages() {
        return $q(function (resolve, reject) {
            var messages = [];
            $http.get(apiUrl).then(function (result) {
                if (!result.data || !result.data.length) {
                    resolve([]);
                } else {
                    result.data.forEach(function (message) {
                        messages.push(formatMessageObj(message));
                    });
                    resolve(messages);
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
        return $q(function (resolve, reject) {
            $http.post(apiUrl, { user: user, text: message, email: email}).then(function (result) {
                if (!result.data || !result.data.length) {
                    resolve([]);
                } else {
                    resolve(result);
                }
            }, function (reason) {
                reject(reason);
            });
        });
    }

    return {
        getAllMessages: getAllMessages,
        sendMessage: sendMessage,
        formatMessage: formatMessageObj
    };
}]);
