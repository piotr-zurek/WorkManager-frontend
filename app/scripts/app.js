'use strict';

/**
 * @ngdoc overview
 * @name workmanagerFrontendApp
 * @description
 * # workmanagerFrontendApp
 *
 * Main module of the application.
 */
angular
    .module('workmanagerFrontendApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        //'ngTouch',
        'ui.bootstrap',
        'datatables',
        'datatables.bootstrap',
        'pascalprecht.translate',
        'ui.router',
        'angular-rickshaw',
        'toastr',
        'rzModule'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    "layout": {
                        templateUrl: 'views/layouts/minimal.html',
                        controller: 'LoginCtrl'
                    },
                    "content@login": {
                        templateUrl: 'views/login.html'
                    }
                }

            })
            .state('company_select', {
                url: '/login/company',
                views: {
                    "layout": {
                        templateUrl: 'views/layouts/minimal.html'
                    },
                    "content@company_select": {
                        templateUrl: 'views/select_company.html',
                        controller: 'CompanyselectCtrl'
                    }
                }
            })
            .state('tasks', {
                url: '/tasks',
                views: {
                    "layout": {
                        templateUrl: 'views/layouts/full.html',
                        controller: 'ApplicationCtrl'
                    },
                    "content@tasks": {
                        templateUrl: 'views/tasks.html',
                        controller: 'TaskCtrl'
                    }
                }
            })
            .state('mywork', {
                url: '/mywork',
                views: {
                    "layout": {
                        templateUrl: 'views/layouts/full.html',
                        controller: 'MyWorkCtrl'
                    },
                    "content@mywork": {
                        templateUrl: 'views/mywork.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    "layout": {
                        templateUrl: 'views/layouts/full.html',
                        controller: 'ApplicationCtrl'
                    },
                    "content@dashboard": {
                        templateUrl: 'views/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })

            .state('profile', {
                url: '/profile',
                views: {
                    "layout": {
                        templateUrl: 'views/layouts/full.html',
                        controller: 'ApplicationCtrl'
                    },
                    "content@profile": {
                        templateUrl: 'views/profile.html',
                        controller: 'DashboardCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('dashboard');

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push(['$q', '$location', '$cookies', function ($q, $location, $cookies) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($cookies.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        delete $cookies.get('token');
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

        $translateProvider.translations('en', {
            'Project': 'Project',
            'Tasks': 'Tasks',
            'Login': 'Login',
            'Submit': 'Submit',
            'Edit': 'Edit',
            'Name': 'Name',
            'Created by': 'Created by',
            'Assigned to': 'Assigned to',
            'Save': 'Save',
            'Cancel': 'Cancel',
            'List View': 'List view',
            'Table View': 'Table view',
            'Progress': 'Progress',
            'Observer': 'Observer',
            'Priority': 'Priority',
            'Type': 'Type',
            'State': 'State',
            'Edit Task': 'Edit Task',
            '-NONE-': '-NONE-'
        });

        $translateProvider.translations('pl', {
            'Project': 'Projekt',
            'Tasks': 'Zadania',
            'Login': 'Zaloguj',
            'Submit': 'Prześlij',
            'Edit': 'Edycja',
            'Name': 'Nazwa',
            'Created by': 'Utworzono przez',
            'Assigned to': 'Przypisane do',
            'Save': 'Zapisz',
            'Cancel': 'Anuluj',
            'List View': 'Widok listy',
            'Table View': 'Widok tabeli',
            'Progress': 'Postęp wykonania',
            'Observer': 'Obserwator',
            'Priority': 'Priorytet',
            'Type': 'Typ zadania',
            'State': 'Status',
            'Edit Task': 'Edycja zadania',
            '-NONE-': '-BRAK-',
            'DT': {
                'First': 'Pierwsza',
                'Last': 'Ostatnia',
                'Search:': 'Szukaj:',
                'Previous': 'Poprzednia',
                'Next': 'Następna'
            }
        });
        $translateProvider.determinePreferredLanguage();
    })
    .run(function ($rootScope, $location, $cookies) {
        $rootScope.$on("$stateChangeStart", function (event, next) {
            if ($cookies.get('token') == null) {
                $location.path("/login");
            } else if ($cookies.get('company') == null) {
                $location.path("/login/company");
            }
        });
    });
