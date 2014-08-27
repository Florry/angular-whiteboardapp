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
			controller: function postItCtrl($scope) {

			}
		};
	});