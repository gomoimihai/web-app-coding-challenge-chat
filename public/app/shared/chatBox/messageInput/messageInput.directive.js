/**
 * chatMessageInput Directive
 * @namespace Directives
 */
challengeChatApp.directive('chatMessageInput', [function () {
    'use strict';
    /**
     * @namespace chatMessageInput
     * @desc Input area of a chat box
     * @memberOf Directives
     */
    return {
        restrict: 'AE',
        scope: {
            sendMessageFn: '='
        },
        replace: true,
        templateUrl: 'app/shared/chatBox/messageInput/messageInput.view.html',
        link: function (scope) {
            scope.messageToBeSent = "";
            scope.invalidMessage = false;
            /**
             * @name sendMessageAction
             * @desc Send a message using the provided callback
             * @param {undefined}
             * @returns {undefined}
             * @memberOf Directives.chatMessageInput
             */
            scope.sendMessageAction = function () {
                if (scope.messageToBeSent !== "") {
                    scope.invalidMessage = false;
                    scope.sendMessageFn(scope.messageToBeSent);
                    scope.messageToBeSent = " ";
                } else {
                     scope.invalidMessage = true;
                }
            };
        }
    };
}]);
