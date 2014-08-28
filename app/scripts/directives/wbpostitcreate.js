'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostitCreate
 * @description
 * # wbPostitCreate
 */
angular.module('whiteboardApp')
	.directive('wbPostItCreate', function($document, CRUDFactory) {
		return {
			templateUrl: './scripts/directives/templates/postit-create.html',
			restrict: 'E',
			link: function(scope, element, attrs) {
				$('#createPostItForm').hide();

				scope.showCreatePostItForm = function() {
					$('#createPostItForm').fadeIn();
				};

				scope.hideCreatePostItForm = function() {
					$('#createPostItForm').fadeOut();
				};

				scope.ghostActive = false;

				scope.createPostItGhost = function($event) {
					if (scope.createForm.$valid) {
						scope.postIt = {
							author: 'Tom Whitemore',
							text: scope.postItText,
							status: 'not started',
							position: {
								x: 0,
								y: 0
							},
							color: scope.color,
							removed: false
						};
						bindElementMove($event);
						scope.ghostActive = true;
					}
				};

				function createPostIt() {
					scope.postIt.position.x = x;
					scope.postIt.position.y = y;
					scope.postits.push(scope.postIt);
					CRUDFactory.createPostIt(scope.postIt);
					$document.unbind("mouseup", createPostIt);
				}


				// GHOST POST IT MOUSE TRACKING FUNCTIONALITY

				var ghost = $('.post-it-ghost');

				var startX,
					startY,
					x,
					y;

				var whiteBoard = $('.whiteboard');

				function clampWidth(value) {
					var maxValue = parseInt(whiteBoard.css('width')) - parseInt(ghost.css('width')),
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

				function bindElementMove($event) {
					$document.bind('mousemove', updateGraphicalPositions);
					$document.bind('mousedown', unbindEvents);

					$document.bind("mouseup", createPostIt);
					startX = $event.screenX;
					startY = $event.screenY;
					updateGraphicalPositions();
				}

				function updateGraphicalPositions() {
					x = event.screenX - ghost.width();
					y = event.screenY - ghost.height();
					ghost.css({
						top: y + 'px',
						left: x + 'px'
					});
				}

				function unbindEvents() {
					$document.unbind('mousedown', unbindEvents);
					scope.ghostActive = false;
					scope.$apply();
				}
			}
		};
	});