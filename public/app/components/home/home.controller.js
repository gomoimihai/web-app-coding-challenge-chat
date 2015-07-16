challengeChatApp.controller('homeController', ['$scope', 'APP_DETAILS', function ($scope, APP_DETAILS) {
    'use strict';
    $scope.appName = APP_DETAILS.appName;
}]);