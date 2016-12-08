'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.currentUser
 * @description
 * # currentUser
 * Current User factory
 */
angular.module('workmanagerFrontendApp')
    .factory('CurrentUser', function ($resource, SERVER_CONF) {
        var resource = $resource(SERVER_CONF.url + '/user/current', {},
            {
                'query': {method: 'GET', isArray: false},
            });

        return resource;
    });
