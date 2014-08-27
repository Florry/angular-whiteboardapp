'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:postIt
 * @description
 * # postIt
 */
angular.module('whiteboardApp')
	.directive('wbPostIt', function ($document) {
		return {
			templateUrl: './scripts/directives/templates/post-it.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			link: function postItCtrl($scope, element) {
				var startX = element.offset().left,
					startY = element.offset().top,
					x = 0,
					y = 0;

				$scope.getStatusCss = function () {
					return $scope.content.status.replace(' ', '-');
				};

				(function bindElementMove() {
					element.bind('mousedown', function (event) {
						startX = event.screenX - element.offset().left;
						startY = event.screenY - element.offset().top;
						$document.bind('mousemove', movePostit);
						$document.bind('mouseup', mouseup);
					});
				}());

				function movePostit(event) {
					y = event.screenY - startY;
					x = event.screenX - startX;
					element.css({
						top: y + 'px',
						left: x + 'px'
					});
				}

				function mouseup() {
					$document.unbind('mousemove', movePostit);
					$document.unbind('mouseup', mouseup);
				}
			}
		};
	});