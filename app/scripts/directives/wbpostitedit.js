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
				content: '=',
				showEditForm: '='
			},
			controller: function postItCtrl(CRUDFactory, $scope) {
				$scope.newContent = {};
				$scope.inputText = $scope.content.text;
				$scope.updatePostit = function(newcontent) {
					console.log(newcontent);
					$scope.content.text = newcontent;
					//CRUDFactory.updatePostit();
					$scope.showEditForm = false;
				};
			}
		};
	});