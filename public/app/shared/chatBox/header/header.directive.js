'use strict';
challengeChatApp
.directive('chatHeader', ['APP_DETAILS', '$mdDialog', function (APP_DETAILS, $mdDialog){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'app/shared/chatBox/header/header.view.html',
        link: function (scope, el, attrs){
            function refreshData(){
                scope.refreshMessageList();
            }
            function showDialog(ev){
                $mdDialog.show({
                    templateUrl: 'app/shared/chatBox/header/dialogUser.view.html',
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

            scope.appName = APP_DETAILS.appName;
            scope.refreshData = refreshData;
            scope.dialog = {
                show: showDialog,
                cancel: cancelDialog,
                confirm: confirmDialogData
            };
        }
    };
}]);


