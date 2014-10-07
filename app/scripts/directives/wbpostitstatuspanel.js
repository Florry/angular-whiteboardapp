'use strict';
angular.module('whiteboardApp')
	.directive('wbPostItStatusPanel', function() {
		return {
			templateUrl: './scripts/directives/templates/post-it-status-panel.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			controller: function postLink($scope) {
				$scope.postIts = $scope.$parent.$parent.postits;
				$scope.done = 'done';
				$scope.inProgress = 'in progress';
				$scope.notStarted = 'not started';
				$scope.onhold = 'on hold';
				$scope.showEditForm = false;

				$scope.showEdit = function() {
					$scope.showEditForm = !$scope.showEditForm;
					$scope.$parent.isBeingEdited = true;
				};

				$scope.changeStatus = function(newStatus) {
					$scope.content.status = newStatus;
					$scope.$parent.$parent.$parent.$broadcast('update-postit', $scope.content);
				};

				$scope.deletePostIt = function(id) {
					$scope.$parent.$parent.$parent.$broadcast('delete-postit', id);
					delete $scope.$parent.$parent.$parent.postits[id];
				};
			}
		};
	});