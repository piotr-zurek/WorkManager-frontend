'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.task
 * @description
 * # Task
 * Factory in the workmanagerFrontendApp.
 */
angular.module('workmanagerFrontendApp')
    .factory('Task', function ($resource, SERVER_CONF) {
        var resource = $resource(SERVER_CONF.url + '/task/:id', {id: '@id'},
            {
                'get': {method: 'GET'},
                'update': {method: 'POST', 'params': {'_method': 'PATCH'}},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: false},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            });

        return resource;
    });
