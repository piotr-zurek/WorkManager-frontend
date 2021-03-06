'use strict';

/**
 * @ngdoc service
 * @name workmanagerFrontendApp.notification
 * @description
 * # notification
 * Factory in the workmanagerFrontendApp.
 */
angular.module('workmanagerFrontendApp')
    .factory('NotificationFactory', function () {

        return {
            notify: function (string) {
                if (!("Notification" in window)) {
                    alert("This browser does not support system notifications");
                }

                // Let's check whether notification permissions have already been granted
                else if (Notification.permission === "granted") {
                    // If it's okay let's create a notification
                    var notification = new Notification(string);
                }

                // Otherwise, we need to ask the user for permission
                else if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {
                        // If the user accepts, let's create a notification
                        if (permission === "granted") {
                            var notification = new Notification(string);
                        }
                    });
                }
            }
        };
    });
