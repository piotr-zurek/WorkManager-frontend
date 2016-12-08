'use strict';

/**
 * @ngdoc directive
 * @name workmanagerFrontendApp.directive:wmEditlist
 * @description
 * # wmEditlist
 */
angular.module('workmanagerFrontendApp')
    .directive('wmEditlist', function ($timeout) {
        return {
            template: '<div class="wm-content" contenteditable="true"></div>',
            restrict: 'E',
            require: '?ngModel',
            link: function postLink(scope, element, attrs, ngModel) {
                // don't do anything unless this is actually bound to a model
                if (!ngModel) {
                    return
                }
                // view -> model
                element.on('keyup paste bind', function (e) {
                    scope.$apply(function () {

                        var checklist = ngModel.$viewValue;
                        var html, html2, rerender;

                        var opts = {
                            //stripTags: true,
                            noLineBreaks: true,
                            stripTags: true,
                            stripBr: true
                        };

                        html = element.children('.wm-content').html();
                        console.error(html);
                        rerender = false;
                        if (opts.stripBr) {
                            //space with attributes
                            html = html.replace(/<.\S[br]*.\S[^><]*>/g, '[nl]');
                            html = html.replace(/<br>$/, '[nl]')
                        }
                        if (opts.noLineBreaks) {
                            html2 = html.replace(/<div>/g, '[nl]').replace(/<br>/g, '[nl]').replace(/<\/div>/g, '[nl]')
                            if (html2 !== html) {
                                rerender = true
                                html = html2
                            }
                        }
                        if (opts.stripTags) {
                            rerender = true;
                            html = html.replace(/<\S[^><]*>/g, '');
                        }
                        var res = html.split("[nl]");
                        if (!ngModel) {
                            ngModel = [];
                        }
                        var change = false;

                        angular.forEach(res, function (value, key) {
                            if (value && value != "" && res.length > 1) {
                                //remove whitespaces here to avoid cursor lost
                                checklist.push({
                                    id: (ngModel.length+1),
                                    body: $('<textarea />').html(value).text(),
                                    checked: false
                                });
                                change = true;
                            }
                        });

                        if(change) {
                            ngModel.$setViewValue(checklist);
                            if (rerender) {
                                ngModel.$render()
                            }
                        }
                        if (html === '') {
                            // the cursor disappears if the contents is empty
                            // so we need to refocus
                            $timeout(function(){
                                element.children().blur()
                                element.children().focus()
                            })
                        }
                        element.children('.wm-content').html(res[res.length - 1]);

                    })
                })
            }
        };
    });
