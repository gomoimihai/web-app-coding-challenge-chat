/**
 * chatBox Directive
 * @namespace Directives
 */
challengeChatApp
.directive('chatBox', ['Pusher', 'PUSHER_OPTIONS', 'ChatBoxService', 'AuthService', '$rootScope',
    function (Pusher, PUSHER_OPTIONS, ChatBoxService, AuthService, $rootScope){
        'use strict';
        /**
         * @namespace chatBox
         * @desc Chat Box directive
         * @memberOf Directives
         */
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'app/shared/chatBox/chatBox.view.html',
            link: function (scope, el) {
                var imagePath = 'https://robohash.org/',
                    imageType = '.png';

                /**
                 * @name formatMessageObj
                 * @desc Formats message object
                 * @param {Object} m Message to format
                 * @returns {Object}
                 * @memberOf Directives.chatBox
                 */
                function formatMessageObj (m) {
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

                /**
                 * @name progressBarToogle
                 * @desc Toggle progress bar
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function progressBarToogle () {
                    if(scope.messages.length > 0) {
                        scope.progressBarVisibility = false;
                    } else{
                        scope.progressBarVisibility = true;
                    }
                }

                /**
                 * @name loadAllMessages
                 * @desc Get's all message using ChatBoxService
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function loadAllMessages () {
                    ChatBoxService.getAllMessages()
                    .then(function (messages) {
                        messages.forEach(function(message) {
                            scope.messages.push(formatMessageObj(message));
                        });
                        progressBarToogle()
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
                /**
                 * @name newMessageSubscribe
                 * @desc Subscribe to new_message event triggered by the subscribed channel
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function newMessageSubscribe () {
                    Pusher.subscribe(PUSHER_OPTIONS.channel, PUSHER_OPTIONS.eventName, function(message){
                        scope.messages.push(formatMessageObj(message));
                    });
                }

                /**
                 * @name init
                 * @desc Start the chatBox directive loading new message and subscribing to new_message event
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function init () {
                    loadAllMessages();
                    newMessageSubscribe();
                }

                /**
                 * @name refreshMessageList
                 * @desc Refresh message list
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function refreshMessageList () {
                    scope.messages = [];
                    loadAllMessages();
                };

                init();

                /**
                 * @type {array}
                 */
                scope.messages = [];

                scope.progressBarVisibility = true;
                /**
                 * @name sendMessage
                 * @desc Send a new message
                 * @param {message} Message to be sent
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                scope.sendMessage = function (message) {
                    if(message){
                        scope.user = AuthService.getUser();
                        ChatBoxService.sendMessage(message, scope.user.name, scope.user.email);
                    }
                };

                scope.$on('refresh', refreshMessageList)
            }

        };
    }]);