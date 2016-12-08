'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.user
 * @description
 * # user
 * User factory
 */
angular.module('workmanagerFrontendApp')
    .factory('User', function ($resource, SERVER_CONF) {
        var resource = $resource(SERVER_CONF.url + '/user/:id', {id: '@id'},
            {
                'get': {method: 'GET'},
                'save': {method: 'POST', 'params': {'_method': 'PATCH'}},
                'query': {method: 'GET', isArray: false},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            });

        return resource;
    });