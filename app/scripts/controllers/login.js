'use strict';

/**
 * @ngdoc function
 * @name workmanagerFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the workmanagerFrontendApp
 */
angular.module('workmanagerFrontendApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $log, $cookies, $location, Auth, Session, toastr) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        function successAuth(res) {
            $cookies.put('token', res.token);
            Session.setUser(res);
            toastr.success('Signed in!', 'Welcome back');
            $location.path('/login/company');
        }

        $scope.login = function (credentials) {

            Auth.signin($scope.credentials, successAuth, function (res) {
                $rootScope.error = 'Invalid credentials.';
                var errorString = "";
                toastr.error('Wrong email or password');
            });
        };
        $scope.signup = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Auth.signup(formData, successAuth, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            })
        };

        $scope.logout = function () {
            Auth.logout(function () {
                window.location = "/"
            });
        };
        $scope.token = $cookies.get('token');
        $scope.tokenClaims = Auth.getTokenClaims();

    });
