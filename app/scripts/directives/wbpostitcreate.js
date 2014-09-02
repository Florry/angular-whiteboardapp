'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:wbPostitCreate
 * @description
 * # wbPostitCreate
 */
angular.module('whiteboardApp')
	.directive('wbPostItCreate', function ($document, CRUDFactory) {
		return {
			templateUrl: './scripts/directives/templates/postit-create.html',
			restrict: 'E',
			link: function (scope, element, attrs) {
				var ghost = $('#post-it-ghost'),
					postItForm = $('#createPostItForm'),
					whiteBoard = $('.whiteboard'),
					x,
					y;

				$document.bind('mousemove', moveGhost);

				scope.ghostActive = false;

				scope.toggleForm = function () {
					if (postItForm.is(":visible")) {
						scope.cancelCreation();
					} else {
						postItForm.show();
					}
				};

				scope.cancelCreation = function () {
					postItForm.hide();
					unbindEvents();
				};

				scope.createPostItGhost = function ($event) {
					scope.postIt = {
						author: scope.username,
						text: scope.postItText,
						status: 'not started',
						position: {},
						removed: false,
						timestamp: scope.date.getFullYear() + '-' + ((scope.date.getMonth() + 1 < 10) ? '0' : '') + (scope.date.getMonth() + 1) + '-' + scope.date.getDate()
					};
					bindGhostSpecificEvents($event);

					postItForm.hide();

					scope.postItText = '';

					scope.ghostActive = true;
				};

				function clampWidth(value) {
					var maxValue = whiteBoard.width() - ghost.width(),
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
					var maxValue = whiteBoard.height() + whiteBoard.offset().top - ghost.height() - 15,
						minValue = whiteBoard.offset().top;
					if (value > maxValue) {
						return maxValue;
					} else if (value < minValue) {
						return minValue;
					} else {
						return value;
					}
				}

				function bindGhostSpecificEvents($event) {
					$document.bind('mouseup', createPostItAtGhostPosition);

					updateGraphicalPositions($event.pageX - ghost.width(), $event.pageX - ghost.height());
				}

				function moveGhost() {
					updateGraphicalPositions(event.pageX - ghost.width(), event.pageY - ghost.height());
				}

				function updateGraphicalPositions(newX, newY) {
					x = clampWidth(newX);
					y = clampHeight(newY);

					ghost.css({
						top: y + 'px',
						left: x + 'px'
					});
				}

				function unbindEvents() {
					$document.unbind('mousedown', unbindEvents);
					$document.unbind('mouseup', createPostItAtGhostPosition);

					scope.ghostActive = false;
				}

				function createPostItAtGhostPosition() {
					scope.postIt.position.x = x;
					scope.postIt.position.y = y;

					CRUDFactory.createPostIt(scope.postIt).success(function (postItCreated) {
						scope.postIt.id = postItCreated.id;
						scope.postits.push(scope.postIt);
						unbindEvents();
						console.log("PostIt was created on the server with an id of " + postItCreated.id);
					});
				}
			}
		};
	});