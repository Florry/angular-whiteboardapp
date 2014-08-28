'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostItStatusPanel
 * @description
 * # wbPostItStatusPanel
 */
angular.module('whiteboardApp')
	.directive('wbPostItStatusPanel', function() {
		return {
			templateUrl: './scripts/directives/templates/post-it-status-panel.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			controller: function postLink($scope) {
				$scope.done = 'done';
				$scope.inProgress = 'in progress';
				$scope.notStarted = 'not started';
				$scope.showEditForm = false;

				$scope.showEdit = function() {

					$scope.showEditForm = !$scope.showEditForm;
				};

				$scope.changeStatus = function(newStatus) {
					$scope.content.status = newStatus;

					//CONNECT TO THE FUCKING SERVER YOU SON OF A BITCH!!
				};


			}
		};
	});