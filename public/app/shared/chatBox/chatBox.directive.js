(function(){
    'use strict';
    angular.module('challengeChat').directive('chatBox', chatBox);
    chatBox.$inject = ['Pusher', 'pusherSetup_const', 'ChatBoxService'];

    function chatBox(Pusher, pusherSetup_const, ChatBoxService){
        var baseTemplateUrl = 'app/shared/chatBox/';
        var chatBoxDir = {};
        chatBoxDir.link = link;
        chatBoxDir.scope = {};
        chatBoxDir.restrict = 'E';
        chatBoxDir.replace = true;
        chatBoxDir.templateUrl = baseTemplateUrl + 'chatBox.view.html';

        function link(scope, el, attrs){
            var imagePath = 'https://robohash.org/';
            var imageType = '.png';
            scope.messages = [];
            scope.user = {
                name: generateRandomName("Guest"),
                email: "no_email@email.com"
            };
            scope.refreshMessageList = refreshMessageList;
            scope.sendMessage = sendMessage;

            init();

            function init(){
                loadAllMessages();
                scrollToBottom();
                newMessageSubscribe();
            }

            function newMessageSubscribe(){
                Pusher.subscribe(pusherSetup_const.channel, pusherSetup_const.eventName, function(message){
                    scope.messages.push(formatMessageObj(message));
                });
            }

            function refreshMessageList(){
                pusherSetup_const = [];
                loadAllMessages();
            }

            function sendMessage(){
                ChatBoxService.sendMessage(scope.messageToBeSent, scope.user.name, scope.user.email);
                scope.messageToBeSent = "";
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
                angular.element("#progressBar").hide();
            }

            function formatMessageObj(m){
                var who = typeof m.user !== 'undefined' ? m.user : "Anonymous",
                notes = typeof m.text !== 'undefined' ? m.text : "",
                date = typeof m.time !== 'undefined' ? m.time : "",
                email = typeof m.email !== 'undefined' ? m.email : "example@example.com",
                face =  "";
                face = imagePath + email+ imageType;
                return {
                    who: who,
                    notes: notes,
                    date: date,
                    face: face
                }
            }

            function scrollToBottom(){
                scope.$watchCollection('messages', function (newValue) {
                    if (newValue)
                    {
                        $(el).find('md-content').scrollTop($(el).find('md-content')[0].scrollHeight+25);
                    }
                });
            }

            function generateRandomName(append){
                return append + Math.floor(Math.random()*900) + 100;
            }
        }

        return chatBoxDir;
    }

})();