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
			restrict: 'E',
			link: function(scope, element) {

				$("#createPostItFormDiv").hide();

				scope.showCreatePostItForm = function() {
					$("#createPostItFormDiv").fadeIn();
				};

				scope.hideCreatePostItForm = function() {
					$("#createPostItFormDiv").fadeOut();
				};
			}
		};
	});