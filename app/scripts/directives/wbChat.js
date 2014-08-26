'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:chat
 * @description
 * # chat
 */
angular.module('whiteboardApp')
	.directive('wbChat', function () {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				element.text('this is the chat directive');
			}
		};
	});