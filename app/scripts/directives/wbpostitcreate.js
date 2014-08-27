'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostitCreate
 * @description
 * # wbPostitCreate
 */
angular.module('whiteboardApp')
	.directive('wbPostItCreate', function() {
		return {
			templateUrl: './scripts/directives/templates/postit-create.html',
			restrict: 'E'
		};
	});