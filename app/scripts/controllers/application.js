'use strict';

/**
 * @ngdoc function
 * @name workmanagerFrontendApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the workmanagerFrontendApp
 */
angular.module('workmanagerFrontendApp')
    .controller('ApplicationCtrl', function ($scope,
                                             USER_ROLES,
                                             $cookies,
                                             $translate,
                                             $location,
                                             Session,
                                             CurrentUser,
                                             SERVER_CONF) {
        $scope.user = CurrentUser.query(function () {
            $scope.meta = $scope.user.metadata;
        });
        $scope.url = SERVER_CONF.public;
    });
