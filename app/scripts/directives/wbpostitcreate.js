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
			link: function(scope, element) {
				$('#createPostItForm').hide();

				scope.showCreatePostItForm = function() {
					$('#createPostItForm').fadeIn();
				};

				scope.hideCreatePostItForm = function() {
					$('#createPostItForm').fadeOut();
				};

				scope.ghostActive = false;

				scope.createPostItGhost = function() {
					// if (scope.createForm.$valid) {
					scope.postIt = {
						author: 'Tom Whitemore',
						text: scope.postItText,
						status: 'not started',
						position: {
							x: 200,
							y: 23
						},
						color: scope.color,
						removed: false
					};
					bindElementMove();
					scope.ghostActive = true;
					// }
				};

				scope.sendForm = function() {
					CRUDFactory.createPostIt(scope.postIt);
				};


				// GHOST POST IT MOUSE TRACKING FUNCTIONALITY

				var ghost = $('.post-it-ghost');

				var startX,
					startY,
					y,
					x;

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

				function bindElementMove() {
					startX = event.screenX;
					startY = event.screenY;
					$document.bind('mousemove', movePostIt);
					$document.bind('mousedown', unbindEvents);
					console.log("bindElementMove() says: " + x + " " + y);
				}

				function movePostIt(event) {
					y = event.screenY;
					x = event.screenX;
					ghost.css({
						top: y + 'px',
						left: x + 'px'
					});
					console.log("movePostIt() says: " + x + " " + y);
				}

				function unbindEvents() {
					$document.unbind('mousemove', movePostIt);
					$document.unbind('mousedown', unbindEvents);
					console.log("unbindEvents() says: " + x + " " + y);
				}
			}
		};
	});