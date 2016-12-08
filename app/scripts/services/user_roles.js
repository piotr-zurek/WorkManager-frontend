'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.USER_ROLES
 * @description
 * # USER_ROLES
 * User roles definitions
 */
angular.module('workmanagerFrontendApp')
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    });
