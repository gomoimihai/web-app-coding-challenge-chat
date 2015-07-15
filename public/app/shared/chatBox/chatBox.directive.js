challengeChatApp
.directive('chatBox', ['Pusher', 'PUSHER_OPTIONS', 'ChatBoxService',
    function (Pusher, PUSHER_OPTIONS, ChatBoxService){
      'use strict';
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'app/shared/chatBox/chatBox.view.html',
            link: function (scope, el){
                var imagePath = 'https://robohash.org/',
                        imageType = '.png';

                function newMessageSubscribe(){
                    Pusher.subscribe(PUSHER_OPTIONS.channel, PUSHER_OPTIONS.eventName, function(message){
                        scope.messages.push(formatMessageObj(message));
                    });
                }

                function loadAllMessages(){
                    ChatBoxService.getAllMessages()
                    .then(function (messages) {
                        messages.forEach(function(message) {
                            scope.messages.push(formatMessageObj(message));
                        });
                        hideProgressBar();
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                function hideProgressBar(){
                    angular.element(el).find('md-progress-linear').addClass('hide');
                }

                function formatMessageObj(m){
                    var who = m.user !== undefined ? m.user : 'Anonymous',
                        notes = m.text !== undefined ? m.text : '',
                        date = m.time !== undefined ? m.time : '',
                        email = m.email !== undefined ? m.email : 'example@example.com',
                        face;
                    face = imagePath + email + imageType;
                    return {
                        who: who,
                        notes: notes,
                        date: date,
                        face: face
                    };
                }

                function generateRandomName(append){
                    return append + Math.floor(Math.random()*900) + 100;
                }

                function init(){
                    loadAllMessages();
                    newMessageSubscribe();
                }

                init();
                scope.messages = [];
                scope.user = {
                    name: generateRandomName("Guest"),
                    email: "no_email@email.com"
                };
                scope.refreshMessageList = function () {
                    scope.messages = [];
                    loadAllMessages();
                };
                scope.sendMessage = function () {
                    ChatBoxService.sendMessage(scope.messageToBeSent, scope.user.name, scope.user.email);
                    scope.messageToBeSent = "";
                };
            }

        };
    }]);