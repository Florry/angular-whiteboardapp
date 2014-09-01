'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostitEdit
 * @description
 * # wbPostitEdit
 */
angular.module('whiteboardApp')
	.directive('wbPostitEdit', function() {
		return {
			templateUrl: './scripts/directives/templates/post-it-edit.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			controller: function postItCtrl(CRUDFactory, $scope) {
				//$scope.newContent = {};

				$scope.inputText = $scope.content.text;

				$scope.updatePostit = function() {
					if ($scope.content.text !== $scope.inputText) {
						var date = new Date();
						$scope.content.text = $scope.inputText;
						$scope.content.timestamp = date.getFullYear() + '-' + ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getTime();

						CRUDFactory.updatePostIt($scope.content);
					}
					$scope.closeEditForm();

				};
				$scope.closeEditForm = function() {
					$scope.$parent.showEditForm = false;
					$scope.$parent.$parent.isBeingEdited = false;
				};
			}
		};
	});