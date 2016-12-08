'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.Screenshot
 * @description
 * # Screenshot
 * Screenshot fctory
 */
angular.module('workmanagerFrontendApp')
    .factory('Screenshot', function (SERVER_CONF, $resource) {
        var resource = $resource(SERVER_CONF.url + '/screenshot/:id', {id: '@id', with_disabled: '@with_disabled'},
            {
                'get': {method: 'GET'},
                'save': {method: 'POST', 'params': {'_method': 'PATCH'}},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            });

        return resource;
    });
