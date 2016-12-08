'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.SERVER_CONF
 * @description
 * # SERVER_CONF
 * Server configuration.
 */
angular.module('workmanagerFrontendApp')
    .constant('SERVER_CONF', {
        'url': 'http://workmanager.myvnc.com/api',
        'public': 'http://workmanager.myvnc.com/'
    });
