'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:consoleLog
 * @description
 * # consoleLog
 */
angular.module('whiteboardApp')
<<<<<<< HEAD
	.directive('consoleLog', function() {
		return {
			template: '<div></div>',
			restrict: 'E',
		link: function postLink(scope, element, attrs) {
=======
	.directive('wbConsoleLog', function () {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
>>>>>>> 27e3621be30926d4f45ad012159a55590f48fb35
				element.text('this is the consoleLog directive');
			}
		};
	});