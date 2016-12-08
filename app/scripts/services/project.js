'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.Project
 * @description
 * # Project
 * Factory in the workmanagerFrontendApp.
 */
angular.module('workmanagerFrontendApp')
    .factory('Project', function ($resource, SERVER_CONF) {
        var resource = $resource(SERVER_CONF.url + '/project/:id', {id: '@id', with_disabled: '@with_disabled'},
            {
                'get': {method: 'GET'},
                'save': {method: 'POST', 'params': {'_method': 'PATCH'}},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            });

        return resource;
    });
