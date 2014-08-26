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
				status: '='
			},
			link: function postLink(scope, $scope, element, attrs) {
				scope.done = 'done';
				scope.inProgress = 'in progress';
				scope.notStarted = 'not started';

				scope.changeStatus = function (newStatus) {
					scope.status = newStatus;

					//CONNECT TO THE FUCKING SERVER YOU SON OF A BITCH!!
				};
			}
		};
	});