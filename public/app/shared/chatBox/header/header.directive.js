(function(){
    'use strict';
    angular.module('challengeChat').directive('chatHeader', header);
    header.$inject = ['appDetails_const', '$mdDialog'];

    function header(appDetails_const, $mdDialog){
        var baseTemplateUrl = 'app/shared/chatBox/header/';
        var headerDir = {};
        headerDir.link = link;
        headerDir.restrict = 'A';
        headerDir.replace = true;
        headerDir.templateUrl = baseTemplateUrl + 'header.view.html';

        function link(scope, el, attrs){
            scope.appName = appDetails_const.appName;
            scope.refreshData = refreshData;
            scope.dialog = {
                show: showDialog,
                cancel: cancelDialog,
                confirm: confirmDialogData
            };
            function refreshData(){
                scope.refreshMessageList();
            }
            function showDialog(ev){
                $mdDialog.show({
                    templateUrl: baseTemplateUrl + 'dialogUser.view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    scope: scope,
                    preserveScope: true,
                    clickOutsideToClose : true
                });
            }

            function cancelDialog(ev){
                $mdDialog.cancel();
            }

            function confirmDialogData(evt){
                $mdDialog.cancel();
            }
        }

        return headerDir;
    }
})();