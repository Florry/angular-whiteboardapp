'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:postIt
 * @description
 * # postIt
 */
angular.module('whiteboardApp')
	.directive('wbPostIt', function($document, CRUDFactory) {
		return {
			templateUrl: './scripts/directives/templates/post-it.html',
			restrict: 'E',
			scope: {
				content: '='
			},
			link: function postItCtrl(scope, element) {
				var startX = element.offset().left,
					startY = element.offset().top,
					y = scope.content.position.y,
					x = scope.content.position.x;
				var whiteBoard = $('.whiteboard');

				function clampWidth(value) {
					var maxValue = parseInt(whiteBoard.css('width')) - parseInt(element.css('width')),
						minValue = whiteBoard.offset().left;
					if (value >= maxValue) {
						return maxValue;
					} else if (value <= minValue) {
						return minValue;
					} else {
						return value;
					}
				}

				function clampHeight(value) {
					var maxValue = parseInt(whiteBoard.css('height')) + parseInt(whiteBoard.offset().top) - 50,
						minValue = whiteBoard.offset().top;
					if (value > maxValue) {
						return maxValue;
					} else if (value < minValue) {
						return minValue;
					} else {
						return value;
					}
				}

				element.css({
					left: scope.content.position.x + 'px',
					top: scope.content.position.y + 'px'
				});

				(function bindElementMove() {
					element.bind('mousedown', function(event) {
						startX = event.screenX - element.offset().left;
						startY = event.screenY - element.offset().top;
						$document.bind('mousemove', movePostit);
						$document.bind('mouseup', mouseup);
					});
				}());

				function movePostit(event) {
					if (!scope.isBeingEdited) {
						y = event.screenY - startY;
						x = event.screenX - startX;
						element.css({
							top: y + 'px',
							left: x + 'px'
						});
					}
				}

				function mouseup() {
					$document.unbind('mousemove', movePostit);
					$document.unbind('mouseup', mouseup);
					if (!scope.isBeingEdited) {
						y = clampHeight(y);
						x = clampWidth(x);
						element.css({
							top: y + 'px',
							left: x + 'px'
						});

						scope.content.position.x = x;
						scope.content.position.y = y;
						CRUDFactory.updatePostIt(scope.content);
						//Uppdaterar vid varje klick
					}
				}

				scope.getStatusCss = function() {
					return scope.content.status.replace(' ', '-');
				};

				scope.isBeingEdited = false;

				element.hover(
					function() {
						$(this).children().children().children('wb-post-it-status-panel').css('opacity', '1');
					},
					function() {
						if (!scope.isBeingEdited) {
							$(this).children().children().children('wb-post-it-status-panel').css('opacity', '0');
						}
					}
				);
			}
		};
	});