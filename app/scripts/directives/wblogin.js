'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbLogin
 * @description
 * # wbLogin
 */
angular.module('whiteboardApp')
	.directive('wbLogin', function () {
		return {
			templateUrl: './scripts/directives/templates/login.html',
			restrict: 'E'
		};
	});