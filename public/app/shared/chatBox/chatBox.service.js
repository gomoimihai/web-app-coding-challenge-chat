(function(){
    'use strict';
    angular.module('challengeChat').factory('ChatBoxService', chatBoxService);
    chatBoxService.$inject = ['$q', '$http', 'pusherSetup_const'];

    function chatBoxService($q, $http, pusherSetup_const) {
        var apiUrl = pusherSetup_const.apiUrl + pusherSetup_const.port + pusherSetup_const.channel;

        function getAllMessages () {
            return $q(function(resolve, reject){
                $http.get(apiUrl).then(function (result) {
                  if (!result.data || !result.data.length) {
                    resolve([]);
                  } else {
                    resolve(result.data);
                  }
                }, function (error) {
                  reject(error);
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
    }
})();
