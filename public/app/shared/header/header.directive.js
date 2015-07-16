/**
 * header Directive
 * @namespace Directives
 */
challengeChatApp
.directive('header', ['APP_DETAILS', '$mdDialog', 'AuthService', '$rootScope',
    function (APP_DETAILS, $mdDialog, AuthService, $rootScope){
        'use strict';
        /**
         * @namespace header
         * @desc header directive
         * @memberOf Directives
         */
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shared/header/header.view.html',
            link: function (scope){

                /**
                 * @name showDialog
                 * @desc Show dialog box
                 * @param {obj}
                 * @returns {undefined}
                 * @memberOf Directives.header
                 */
                function showDialog(ev){
                    scope.user = AuthService.getUser();
                    $mdDialog.show({
                        templateUrl: 'app/shared/header/dialogUser.view.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        scope: scope,
                        preserveScope: true,
                        clickOutsideToClose : true
                    });
                }

                /**
                 * @name cancelDialog
                 * @desc Close dialog box
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.header
                 */
                function cancelDialog(){
                    $mdDialog.cancel();
                }

                /**
                 * @name confirmDialogData
                 * @desc Save edit user new data and closes dialog box
                 * @param {undefined}
                 * @returns {undefined}
                 * @memberOf Directives.header
                 */
                function confirmDialogData(){
                    AuthService.setUser(scope.user.name, scope.user.email);
                    $mdDialog.cancel();
                }

                scope.appName = APP_DETAILS.appName;

                scope.refreshData = function(){
                    scope.$parent.$broadcast('refresh');
                };

                scope.dialog = {
                    show: showDialog,
                    cancel: cancelDialog,
                    confirm: confirmDialogData
                };
            }
        };
}]);


