'use strict';

/**
 * @ngdoc function
 * @name workmanagerFrontendApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the workmanagerFrontendApp
 */
angular.module('workmanagerFrontendApp')
    .controller('DashboardCtrl', function ($scope) {
        $scope.options2 = {
            renderer: 'bar'
        };
        $scope.features2 = {
            hover: {
                xFormatter: function (x) {
                    return 't=' + x;
                },
                yFormatter: function (y) {
                    return '$' + y;
                }
            }
        };
        $scope.series2 = [
            {
                data: [
                    {x: 0, y: 40},
                    {x: 1, y: 49},
                    {x: 2, y: 38},
                    {x: 3, y: 30},
                    {x: 4, y: 32},
                    {x: 5, y: 38},
                    {x: 6, y: 30}],
                color: '#0aa699',
                name: 'My closed tasks'
            },
            {
                data: [
                    {x: 0, y: 40},
                    {x: 1, y: 49},
                    {x: 2, y: 38},
                    {x: 3, y: 30},
                    {x: 4, y: 32},
                    {x: 5, y: 49},
                    {x: 6, y: 38}],
                color: '#3db9af',
                name: 'My open/pending tasks'
            },
            {
                data: [
                    {x: 0, y: 48},
                    {x: 1, y: 59},
                    {x: 2, y: 39},
                    {x: 3, y: 30},
                    {x: 4, y: 30},
                    {x: 5, y: 59},
                    {x: 6, y: 39}],
                color: '#93d3ce',
                name: 'All tasks in projects'
            }
        ];
    });
