'use strict';
challengeChatApp
.factory('ChatBoxService', ['$q', '$http', 'PUSHER_OPTIONS', function ($q, $http, PUSHER_OPTIONS) {
    var apiUrl = PUSHER_OPTIONS.apiUrl + PUSHER_OPTIONS.port + PUSHER_OPTIONS.channel;

    function getAllMessages () {
        return $q(function(resolve, reject){
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

    function sendMessage(message, user, email){
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
