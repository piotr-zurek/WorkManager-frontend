'use strict';

/**
 * @ngdoc function
 * @name workmanagerFrontendApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the workmanagerFrontendApp
 */
angular.module('workmanagerFrontendApp')
    .controller('TaskCtrl', function ($scope, $rootScope, $uibModal, $log, $cookies, Task, Project, User, Session, DTOptionsBuilder, DTColumnBuilder, $translate, Comment, toastr) {
        $scope.currentPage = 1;

        Task.query({'company_id': $cookies.getObject('company')['id']}, function (resp) {
            $scope.tasks = resp;
        });

        $translate(['DT.First', 'DT.Last', 'DT.Search:', 'DT.Next', 'DT.Previous']).then(function (translations) {
            console.log(translations['DT.Next']);
            $scope.dtOptions = DTOptionsBuilder
                .newOptions()
                .withLanguage({
                    "sEmptyTable": "No data available in table",
                    "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
                    "sInfoEmpty": "Showing 0 to 0 of 0 entries",
                    "sInfoFiltered": "(filtered from _MAX_ total entries)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ",",
                    "sLengthMenu": "Show _MENU_ entries",
                    "sLoadingRecords": "Loading...",
                    "sProcessing": "Processing...",
                    "sSearch": translations['DT.Search:'],
                    "sZeroRecords": "No matching records found",
                    "oPaginate": {
                        "sFirst": translations['DT.First'],
                        "sLast": translations['DT.Last'],
                        "sNext": translations['DT.Next'],
                        "sPrevious": translations['DT.Previous']
                    },
                    "oAria": {
                        "sSortAscending": ": activate to sort column ascending",
                        "sSortDescending": ": activate to sort column descending"
                    }
                })
                .withBootstrap();
        });

        $scope.createTask = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modals/add_task.html',
                controller: 'TaskCreateCtrl',
                size: '',
                resolve: {
                    Projects: function () {
                        return Project.query({
                            'company_id': $cookies.getObject('company')['id']
                        });
                    },
                    Company: function () {
                        return $cookies.getObject('company');
                    }
                }
            });
            modalInstance.result.then(function (new_task) {
                var task = new Task(new_task);
                task.$save()
                    .then(function (res) {
                        $scope.tasks.data.push(res.task);
                        $log.log($scope.tasks.data);
                    })
                    .catch(function (req) {
                        console.log(req);
                        if (req.status == 400) {
                            var validator = "";
                            var e = req.data.validator;
                            for (var key in e) {
                                if (e.hasOwnProperty(key)) {
                                    validator = validator + e[key] + "<br>";
                                }
                            }
                            console.log(validator);
                            toastr.error(validator, 'Validation error:', {
                                allowHtml: true
                            });
                        }
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            modalInstance.rendered.then(function () {
                $rootScope.$broadcast('rzSliderForceRender'); //Force refresh sliders on render. Otherwise bullets are aligned at left side.
            });

        };

        $scope.editTask = function ($index) {
            var task = $scope.tasks.data[$index];
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modals/edit_task.html',
                controller: 'TaskEditCtrl',
                size: '',
                resolve: {
                    task: function () {
                        return angular.copy(task);
                    },
                    Projects: function () {
                        return Project.query();
                    },
                    Users: function () {
                        return User.query({
                            'company_id': task.company_id,
                            'project_id': task.project_id
                        });
                    },
                    Company: function () {
                        return $cookies.getObject('company');
                    }
                }
            });

            modalInstance.result.then(function (updated_task) {
                $scope.tasks.data[$index] = updated_task;
                Task.update({id: updated_task.id}, updated_task);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            modalInstance.rendered.then(function () {
                $rootScope.$broadcast('rzSliderForceRender'); //Force refresh sliders on render. Otherwise bullets are aligned at left side.
            });

        };

        $scope.showTaskPreview = function ($index) {
            var task = $scope.tasks.data[$index];
            $scope.$emit('showTaskPreviewEvent', task);
            //TODO: wracanie na stronę i przywracanie długości strony w tabeli

            $scope.blockexpanded = true;
        };

        $rootScope.$on('closeTaskPreviewEvent', function (event, arg) {
            $scope.blockexpanded = false;
            console.log($scope.oldDisplayLength + 'dlugosc');
            // $scope.dtOptions.withDisplayLength($scope.oldDisplayLength);
        });

        $scope.removeTask = function (task, index) {
            Task.remove({id: task.id}, function () {
                $scope.tasks.data.splice(index, 1);
            });
        };

        $scope.createComment = function (task, body) {
            Comment.save({
                task_id: task.id,
                body: body
            }, function (resp) {
                task.comments.push(resp.comment);
                task.commentInput = null;
            });
        };
        $scope.getProgressbarType = function (value) {
            var type;
            if (value < 25) {
                type = 'success';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }
            return type;
        }
    })
    .controller('TaskEditCtrl', function ($scope, $filter, $uibModalInstance, task, Projects, Users, User, Company, TASKCONSTANTS) {

        $scope.task = task;
        $scope.projects = Projects;
        $scope.users = Users;
        $scope.assigned_to = Users;
        $scope.priorities = TASKCONSTANTS.priorities;
        $scope.types = TASKCONSTANTS.types;
        $scope.states = TASKCONSTANTS.states;
        $scope.company = Company;

        $scope.temp = {
            'project': task.project,
            'observer': task.observer,
            'assigned_to': task.assigned,
            'priority': task.priority,
            'state': task.state,
            'type': task.type,
            'deadline': $filter('date')(task.deadline, 'yyyy-MM-dd'),
        };

        // close modal
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // Save edited user.
        $scope.save = function () {
            //Copy temp to task array
            $scope.task.deadline = $scope.temp.deadline ? $scope.temp.deadline : null;

            //Save action
            $uibModalInstance.close($scope.task);
        };
        $scope.changeProject = function () {
            $scope.task.project_id = $scope.temp.project ? $scope.temp.project.id : null;
            $scope.task.project.name = $scope.temp.project.name;

            //Load users
            $scope.users = User.query({
                'company_id': $scope.company.id,
                'project_id': $scope.task.project_id
            });
        };
        $scope.changeObserver = function () {
            $scope.task.observer_id = $scope.temp.observer ? $scope.temp.observer.id : null;
            $scope.task.observer = $scope.temp.observer;
        };
        $scope.changeAssigned = function () {
            $scope.task.assigned_to_id = $scope.temp.assigned_to ? $scope.temp.assigned_to.id : null;
            $scope.task.assigned = $scope.temp.assigned_to;
        };

        var formatToPercentage = function (value) {
            return value + '%';
        };
        $scope.progressSliderOptions = {floor: 0, ceil: 100, translate: formatToPercentage, step: 5, showTicks: true}
    })
    .controller('TaskCreateCtrl', function ($scope, $log, $uibModalInstance, Projects, Company, User, TASKCONSTANTS) {
        console.log('company:', Company);
        $scope.priorities = TASKCONSTANTS.priorities;
        $scope.types = TASKCONSTANTS.types;
        $scope.states = TASKCONSTANTS.states;
        $scope.task = {
            company_id: Company.id,
            priority: $scope.priorities[2].id
        };
        $scope.projects = Projects;
        $scope.users = [];
        $scope.assigned_to = [];

        $scope.company = Company;

        // close modal
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // Save edited user.
        $scope.save = function () {
            $uibModalInstance.close($scope.task);
        };
        $scope.changeProject = function () {
            $scope.task.project_id = $scope.temp.project ? $scope.temp.project.id : null;

            //Load users
            $scope.users = User.query({
                'company_id': $scope.company.id,
                'project_id': $scope.task.project_id
            });
        };
        $scope.changeObserver = function () {
            $scope.task.observer_id = $scope.temp.observer ? $scope.temp.observer.id : null;
        };
        $scope.changeAssigned = function () {
            $scope.task.assigned_to_id = $scope.temp.assigned_to ? $scope.temp.assigned_to.id : null;
        }
    })
    .controller('TaskPreviewCtrl', function ($scope, $rootScope) {
        console.log('start ctrl');
        $rootScope.$on('showTaskPreviewEvent', function (event, task) {
            $scope.task = task;
            $scope.blockexpanded = true;
        });

        $scope.close = function () {

            $scope.$emit('closeTaskPreviewEvent');
            $scope.blockexpanded = false;
        };
    });
