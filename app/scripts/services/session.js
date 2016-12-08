'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.Session
 * @description
 * # Session
 * Service keep session metadata
 */
angular.module('workmanagerFrontendApp')
    .service('Session', function () {

        this.setUser = function (user) {
            this.user = user;
        };

        this.getUser = function () {
            return this.user;
        };

        this.setCompany = function (company) {
            this.company = company;
        };

        this.getCompany = function () {
            return this.company;
        }
    });
