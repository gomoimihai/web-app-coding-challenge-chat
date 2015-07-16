/**
 * chatBox Directive
 * @namespace Directives
 */
challengeChatApp.directive('chatBox', ['Pusher', 'PUSHER_OPTIONS', 'ChatBoxService', 'AuthService', '$log',
    function (Pusher, PUSHER_OPTIONS, ChatBoxService, AuthService, $log) {
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
            link: function (scope) {
                var user;

                /**
                 * @name setProgressBarVisibility
                 * @desc Set progress bar visibility
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function setProgressBarVisibility(visibility) {
                    scope.progressBarVisibility = visibility;
                }

                /**
                 * @name loadAllMessages
                 * @desc Get's all message using ChatBoxService
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function loadAllMessages() {
                    setProgressBarVisibility(true);
                    ChatBoxService.getAllMessages().then(function (response) {
                        scope.messages = response;
                        setProgressBarVisibility(false);
                    }).catch(function (error) {
                        console.log(error);
                        setProgressBarVisibility(false);
                    });
                }
                /**
                 * @name newMessageSubscribe
                 * @desc Subscribe to new_message event triggered by the subscribed channel
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function newMessageSubscribe() {
                    Pusher.subscribe(PUSHER_OPTIONS.channel, PUSHER_OPTIONS.eventName, function (message) {
                        scope.messages.push(ChatBoxService.formatMessage(message));
                        $log.info("Message received");
                    });
                }

                /**
                 * @name init
                 * @desc Start the chatBox directive loading new message and subscribing to new_message event
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.chatBox
                 */
                function init() {
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
                function refreshMessageList() {
                    scope.messages = [];
                    loadAllMessages();
                }

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
                    if (message) {
                        user = AuthService.getUser();
                        ChatBoxService.sendMessage(message, user.name, user.email).then(function (response) {
                            if (response) {
                                $log.info("Message sent");
                            }
                            setProgressBarVisibility(false);
                        }).catch(function (error) {
                            $log.error(error);
                            setProgressBarVisibility(false);
                        });
                    }
                };

                scope.$on('refresh', refreshMessageList);
            }

        };
    }]);