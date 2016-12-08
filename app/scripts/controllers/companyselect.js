'use strict';

/**
 * @ngdoc function
 * @name workmanagerFrontendApp.controller:CompanyselectCtrl
 * @description
 * # CompanyselectCtrl
 * Controller of the workmanagerFrontendApp
 */
angular.module('workmanagerFrontendApp')
    .controller('CompanyselectCtrl', function ($scope, $rootScope, $location, $cookies, Session, Company) {


        $scope.companies = Company.query();
        $scope.companyModel = null;

        $scope.selectCompany = function () {
            Session.setCompany($scope.companyModel);
            $cookies.putObject('company', $scope.companyModel);
            $location.path('/');
        }
    });
