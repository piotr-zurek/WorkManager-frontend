'use strict';

/**
 * @ngdoc directive
 * @name workmanagerFrontendApp.directive:wmUser
 * @description
 * # wmUser
 */
angular.module('workmanagerFrontendApp')
    .directive('wmUser', function (User, SERVER_CONF) {
        return {
            template: '<span uib-popover-template="userPopoverTemplateUrl" uib-popover="{{userDetails}}" popover-trigger="mouseenter" type="button"><ng-transclude></ng-transclude></span>',
            restrict: 'E',
            transclude: true,
            scope: {
                user: '=user'
            },
            link: function postLink(scope, element, attrs) {
                scope.userPopoverTemplateUrl = 'views/popovers/userPopoverTemplateUrl.html';
                scope.url = SERVER_CONF.public;
                element.on('mouseover', function () {
                    console.log('hover');
                    User.get({id: 1}, function (user, getResponseHeaders) {
                        scope.userDetails = user.name + ' ' + user.lastname;
                    });
                })
            }
        };
    });
