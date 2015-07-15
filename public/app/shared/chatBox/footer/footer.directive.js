(function(){
    'use strict';
    angular.module('challengeChat').directive('chatFooter', footer);
    footer.$inject = ['ChatBoxService'];

    function footer(ChatBoxService){
        var baseTemplateUrl = 'app/shared/chatBox/footer/';
        var footerDir = {};
        footerDir.link = link;
        footerDir.restrict = 'A';
        footerDir.replace = true;
        footerDir.templateUrl = baseTemplateUrl + 'footer.view.html';

        function link(scope, el, attrs){
            scope.messageToBeSent = "";
            scope.sendMessageAction = function(){
                scope.sendMessage();
            }
        }

        return footerDir;
    }
})();