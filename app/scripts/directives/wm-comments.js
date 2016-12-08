'use strict';

/**
 * @ngdoc directive
 * @name workmanagerFrontendApp.directive:wmComments
 * @description
 * # wmComments
 */
angular.module('workmanagerFrontendApp')
    .directive('wmComments', function ($interval, SERVER_CONF, Comment, NotificationFactory) {
        return {
            templateUrl: 'views/partials/comments.html',
            restrict: 'E',
            transclude: true,
            scope: {
                task: '=task',
                preload: '@preload',
                open: '@'
            },
            link: function postLink(scope, element, attrs) {

                //init values
                if(attrs.preload) scope.comments = scope.task.comments;
                scope.url = SERVER_CONF.public;



                var promiseInterval;
                attrs.$observe('open', function(newValue) {
                    if(newValue=="true") {
                        console.log('uruchom');
                        scope.intervalStart();
                    } else {
                        console.log('zatrzymaj');
                        scope.stopInterval();
                    }
                });
                scope.intervalStart = function() {
                    // stops any running interval to avoid two intervals running at the same time
                    scope.stopInterval();

                    // store the interval promise
                    promiseInterval = $interval(function() {
                        scope.getComments();
                    }, 1000);
                };
                scope.stopInterval = function() {
                    $interval.cancel(promiseInterval);
                };

                scope.$on('$destroy', function() {
                    scope.stopInterval();
                });

                scope.lastId = -1;
                scope.getComments = function() {
                    Comment.query({task_id: scope.task.id},function(comments, getResponseHeaders){
                        if(scope.lastId!=comments.last_id && comments.data.length>0) {
                            scope.comments = comments.data;
                            console.log('nowy komentarz!');
                            var last_comment = comments.data[comments.data.length-1];
                            var name = "New comment in task #" + scope.task.id + ": " + last_comment.body;

                            //if not initial check - notify user
                            if(scope.lastId!=-1) {
                                NotificationFactory.notify(name);
                            }

                            scope.lastId = comments.last_id;
                        }
                    })
                }
            }
        };
    });
