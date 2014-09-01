'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostItStatusPanel
 * @description
 * # wbPostItStatusPanel
 */
angular.module('whiteboardApp')
	.directive('wbPostItStatusPanel', function () {
		return {
			templateUrl: './scripts/directives/templates/post-it-status-panel.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			controller: function postLink($scope, CRUDFactory) {
				$scope.done = 'done';
				$scope.inProgress = 'in progress';
				$scope.notStarted = 'not started';
				$scope.onhold = 'on hold';
				$scope.showEditForm = false;

				$scope.showEdit = function () {
					$scope.showEditForm = !$scope.showEditForm;
					$scope.$parent.isBeingEdited = true;
				};

				$scope.changeStatus = function (newStatus) {
					$scope.content.status = newStatus;
					CRUDFactory.updatePostIt($scope.content);
				};

				$scope.deletePostIt = function (id) {
					CRUDFactory.deletePostIt(id);
					for (var i = 0; i < $scope.$parent.$parent.postits.length; i++) {
						if ($scope.$parent.$parent.postits[i].id === id) {
							$scope.$parent.$parent.postits.splice(i, 1);
						}
					}
				};
			}
		};
	});