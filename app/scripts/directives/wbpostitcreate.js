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
				var ghost = $('#post-it-ghost'),
					createPostItDiv = $('#create-post-it-div'),
					whiteBoard = $('.whiteboard'),
					x,
					y;

				function init() {
					$document.bind('mousemove', moveGhost);
					scope.ghostActive = false;
				}

				init();

				scope.toggleForm = function() {
					if (createPostItDiv.is(':visible')) {
						createPostItDiv.hide();
					} else {
						createPostItDiv.show();
					}
				};


				scope.cancelCreationOfPostIt = function() {
					unbindEvents();
					scope.ghostActive = false;
				};

				scope.createPostItGhost = function() {
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
						timestamp: date.getFullYear() + '-' + ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1) + '-' + ((date.getDate() < 10) ? '0' : '') + (date.getDate()) + ' - ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + (date.getMinutes())
					};

					restrictCreationOfPostItToWhiteboard();

					createPostItDiv.hide();
					scope.postItText = '';

					scope.ghostActive = true;
				};

				function restrictCreationOfPostItToWhiteboard() {
					ghost.hover(function() {
						ghost.children().show();
						ghost.removeClass('outside-boundaries').addClass('inside-boundaries');
						$document.bind('mouseup', createPostItAtGhostPosition);
					}, function() {
						$document.unbind('mouseup', createPostItAtGhostPosition);
					});

					whiteBoard.mouseleave(function() {
						console.log("Classes: " + ghost.prop("class"));
						ghost.removeClass('inside-boundaries').addClass('outside-boundaries');
						ghost.children().hide();
					});
				}

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
					ghost.unbind('hover');
					whiteBoard.unbind('mouseleave');
				}

				function createPostItAtGhostPosition() {
					scope.postItTemplate.position.x = x;
					scope.postItTemplate.position.y = y;

					unbindEvents();

					CRUDFactory.createPostIt(scope.postItTemplate, function(postItCreated) {
						scope.postItTemplate.id = postItCreated.id;
						scope.postits.push(scope.postItTemplate);

						scope.ghostActive = false;

						console.log('PostIt was created on the server with an id of ' + postItCreated.id);
					});
				}
			}
		};
	});