'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.Comment
 * @description
 * # Comment
 * Comment factory
 */
angular.module('workmanagerFrontendApp')
    .factory('Comment', function ($resource, SERVER_CONF) {
        var resource = $resource(SERVER_CONF.url + '/comment/:id', {id: '@id'},
            {
                'get': {method: 'GET'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: false},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            });

        return resource;
    });
