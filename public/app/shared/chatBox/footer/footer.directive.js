'use strict';
challengeChatApp
.directive('chatFooter', ['ChatBoxService', function (ChatBoxService){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'app/shared/chatBox/footer/footer.view.html',
        link: function (scope, el, attrs){
            scope.messageToBeSent = "";
            scope.sendMessageAction = function(){
                scope.sendMessage();
            }
        }
    };
}]);
