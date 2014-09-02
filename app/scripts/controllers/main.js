'use strict';

/**
 * @ngdoc function
 * @name whiteboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whiteboardApp
 */
angular.module('whiteboardApp')
	.controller('MainCtrl', function($interval, $scope, CRUDFactory, localStorageService) {
			$scope.username = localStorageService.get('username');
			$scope.loggedIn = (function() {
				if ($scope.username !== undefined && $scope.username !== '' && $scope.username !== null) {
					return true;
				} else {
					return false;
				}
			}());
			$scope.login = function() {
				localStorageService.add('username', $scope.username);
				$scope.loggedIn = true;
			};
			$scope.logout = function() {
				localStorageService.remove('username');
				$scope.loggedIn = false;
				$scope.cancelCreationOfPostIt();
			};
			$scope.postits = [];

			function updatePostits(postitArray, current, iterator) {
				CRUDFactory.readPostIts(function(data) {
					postitArray = data;
				});
				current = postitArray[iterator];
			}

			CRUDFactory.readPostIts(function(data) {
				$scope.postits = data;
			});
			$interval(function() {
				CRUDFactory.readPostIts(function(data) {
					var getPostits = data;
					if (getPostits.length > 0) {
						for (var i = 0; i < $scope.postits.length; i++) {
							var getPostit = getPostits[i],
								oldPostit = $scope.postits[i];

							if (getPostit !== undefined) {
								$scope.postits[i].text = getPostit.text;
								$scope.postits[i].timestamp = getPostit.timestamp;
							}

							updatePostits(getPostits, getPostit, i);

							if (getPostit !== undefined) {
								if ($scope.postits[i].status !== getPostit.status) {
									$scope.postits[i] = getPostit;
								}
							}
							updatePostits(getPostits, getPostit, i);
							if (getPostit !== undefined) {
								if (getPostit.position.x !== oldPostit.position.x || getPostit.position.y !== oldPostit.position.y) {
									$scope.postits[i] = getPostit;
								}
							}
						}
						updatePostits(getPostits, null, null);
						if (getPostits.length > $scope.postits.length) {
							for (i = 0; i < getPostits.length - $scope.postits.length; i++) {
								$scope.postits.push(getPostits[i]);
							}
						}
						updatePostits(getPostits, null, null);

					} else {
						$scope.postits.length = 0;
					}
				});
			}, 1000);

			<< << << < HEAD
			$scope.populatePostits = function() { === === =
					$scope.populatePostits = function() { >>> >>> > b4554a96789f362896749fdc688eba029cc2a38b
						//DEBUG STUFFS
						var postits = [{
							'id': 1,
							'author': 'Tom Whitemore',
							'text': 'Helt automagiskt',
							'status': 'not started',
							'position': {
								'x': 200,
								'y': 23
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 2,
							'author': 'Bobby Thompson',
							'text': 'Lorem ipsum',
							'status': 'not started',
							'position': {
								'x': 30,
								'y': 30
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 3,
							'author': 'Bobby Thompson',
							'text': 'Plan your funeral, kid',
							'status': 'not started',
							'position': {
								'x': 90,
								'y': 30
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 4,
							'author': 'Bobby Thompson',
							'text': 'Plan your funeral, kid',
							'status': 'not started',
							'position': {
								'x': 45,
								'y': 10
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 5,
							'author': 'Bobby Thompson',
							'text': 'Plan your funeral, kid',
							'status': 'not started',
							'position': {
								'x': 900,
								'y': 600
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 6,
							'author': 'Bobby Thompson',
							'text': 'Plan your funeral, kid',
							'status': 'not started',
							'position': {
								'x': 200,
								'y': 100
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 7,
							'author': 'Bobby Thompson',
							'text': 'Plan your funeral, kid',
							'status': 'not started',
							'position': {
								'x': 50,
								'y': 52
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}, {
							'id': 8,
							'author': 'Bobby Thompson',
							'text': 'Plan your funeral, kid',
							'status': 'not started',
							'position': {
								'x': 100,
								'y': 90
							},
							'removed': false,
							'timestamp': '2014-08-32'
						}];
						for (var i = 0; i < postits.length; i++) {
							// $scope.postits.push(postits[i]);
						}
						var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'],
							word1 = '',
							word2 = '',
							randomNumber = Math.random() * 20;
						for (i = 0; i < randomNumber; i++) {
							word1 += letters[Math.round(Math.random() * letters.length)];
							word2 += letters[Math.round(Math.random() * letters.length)];
						}

						var postit = {
							id: Math.round(Math.random() * 3000),
							author: word1,
							text: word2,
							status: 'not started',
							position: {
								x: Math.random() * screen.width,
								y: Math.random() * screen.height
							},
							removed: false,
							timestamp: $scope.date.getFullYear() + '-' + (($scope.date.getMonth() + 1 < 10) ? '0' : '') + ($scope.date.getMonth() + 1) + '-' + $scope.date.getDate()
						};
						$scope.postits.push(postit);
						CRUDFactory.createPostIt(postit);
				}; << << << < HEAD === === =

				>>> >>> > b4554a96789f362896749fdc688eba029cc2a38b
			});