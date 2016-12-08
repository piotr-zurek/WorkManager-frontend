'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.Auth
 * @description
 * # Auth
 * Authorization factory
 */
angular.module('workmanagerFrontendApp')
    .factory('Auth', function ($http, $cookies, SERVER_CONF) {
        function urlBase64Decode(str) {
            console.log(str);
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getClaimsFromToken() {
            var token = $cookies.get('token');
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var tokenClaims = getClaimsFromToken();

        return {
            signup: function (data, success, error) {
                $http.post(SERVER_CONF.url + '/signup', data).success(success).error(error)
            },
            signin: function (data, success, error) {
                $http.post(SERVER_CONF.url + '/login', data).success(success).error(error)
            },
            logout: function (success) {
                tokenClaims = {};
                $cookies.remove('token');
                success();
            },
            getTokenClaims: function () {
                return tokenClaims;
            }
        };
    });
