'use strict';

/**
 * @ngdoc filter
 * @name workmanagerFrontendApp.filter:startFrom
 * @function
 * @description
 * # startFrom
 * Filter in the workmanagerFrontendApp.
 */
angular.module('workmanagerFrontendApp')
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
