'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:postIt
 * @description
 * # postIt
 */
angular.module('whiteboardApp')
	.directive('wbPostIt', function () {
		return {
			templateUrl: './scripts/directives/templates/post-it.html',
			restrict: 'E',
			controller: function ($scope) {

			}
		};
	});