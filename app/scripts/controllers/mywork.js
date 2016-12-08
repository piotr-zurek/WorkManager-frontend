'use strict';

/**
 * @ngdoc function
 * @name workmanagerFrontendApp.controller:MyworkctrlCtrl
 * @description
 * # MyworkctrlCtrl
 * Controller of the workmanagerFrontendApp
 */
angular.module('workmanagerFrontendApp')
    .controller('MyWorkCtrl', function ($scope, Screenshot) {
        Screenshot.query(function(resp) {
            $scope.screenshots = resp;
        });
    });
