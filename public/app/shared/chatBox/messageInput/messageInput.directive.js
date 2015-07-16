/**
 * chatMessageInput Directive
 * @namespace Directives
 */
challengeChatApp
.directive('chatMessageInput', ['ChatBoxService', function (ChatBoxService){
    'use strict';
    /**
     * @namespace chatMessageInput
     * @desc Input area of a chat box
     * @memberOf Directives
     */
    return {
        restrict: 'AE',
        scope:{
            sendMessageFnc: '='
        },
        replace: true,
        templateUrl: 'app/shared/chatBox/messageInput/messageInput.view.html',
        link: function (scope){
            scope.messageToBeSent = "";
            /**
             * @name sendMessageAction
             * @desc Send a message using the provided callback
             * @param {undefined}
             * @returns {undefined}
             * @memberOf Directives.chatMessageInput
             */
            scope.sendMessageAction = function(){
                scope.sendMessageFnc(scope.messageToBeSent);
                scope.messageToBeSent = "";
            }
        }
    };
}]);
