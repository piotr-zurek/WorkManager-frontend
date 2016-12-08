'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.Company
 * @description
 * # Company
 * Company factory
 */
angular.module('workmanagerFrontendApp')
    .factory('Company', function ($resource, SERVER_CONF) {
        var resource = $resource(SERVER_CONF.url + '/company/:id', {id: '@id'},
            {
                'get': {method: 'GET'},
                'save': {method: 'POST', 'params': {'_method': 'PATCH'}},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            });

        return resource;
    });
