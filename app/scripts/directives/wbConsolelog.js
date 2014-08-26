'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:consoleLog
 * @description
 * # consoleLog
 */
angular.module('whiteboardApp')
	.directive('wbConsoleLog', function () {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				element.text('this is the consoleLog directive');
			}
		};
	});