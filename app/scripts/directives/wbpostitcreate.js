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
					postItDiv = $('#createPostItDiv'),
					whiteBoard = $('.whiteboard'),
					x,
					y;

				init();

				function init() {
					$document.bind('mousemove', moveGhost);
					scope.ghostActive = false;
				}


				scope.toggleForm = function () {
					if (postItDiv.is(':visible')) {
						scope.cancelCreation();
					} else {
						postItDiv.show();
					}
				};


				scope.cancelCreation = function () {
					postItDiv.hide();
					unbindEvents();
				};

				scope.createPostItGhost = function () {
					var date = new Date();

					scope.postItTemplate = {
						id: '',
						author: scope.username,
						text: scope.postItText,
						status: 'not started',
						position: {
							x: 0,
							y: 0
						},
						removed: false,
						timestamp: date.getFullYear() + '-' + ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate()
					};

					$document.bind('mouseup', createPostItAtGhostPosition);

					postItDiv.hide();

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
					var maxValue = whiteBoard.height() + whiteBoard.offset().top - 50,
						minValue = whiteBoard.offset().top;
					if (value > maxValue) {
						return maxValue;
					} else if (value < minValue) {
						return minValue;
					} else {
						return value;
					}
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
					$document.unbind('mouseup', createPostItAtGhostPosition);
					scope.ghostActive = false;
				}

				function createPostItAtGhostPosition() {
					scope.postItTemplate.position.x = x;
					scope.postItTemplate.position.y = y;


					CRUDFactory.createPostIt(scope.postItTemplate, function (postItCreated) {
						scope.postItTemplate.id = postItCreated.id;
						scope.postits.push(scope.postItTemplate);

						unbindEvents();
						console.log("PostIt was created on the server with an id of " + postItCreated.id);
					});
				}
			}
		};
	});