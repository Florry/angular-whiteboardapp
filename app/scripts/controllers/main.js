'use strict';

/**
 * @ngdoc function
 * @name whiteboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whiteboardApp
 */
angular.module('whiteboardApp')
	.controller('MainCtrl', function ($interval, $scope, CRUDFactory, localStorageService) {
		$scope.date = new Date();
		$scope.username = localStorageService.get('username');
		$scope.loggedIn = (function () {
			if ($scope.username !== undefined && $scope.username !== '' && $scope.username !== null) {
				return true;
			} else {
				return false;
			}
		}());
		$scope.login = function () {
			localStorageService.add('username', $scope.username);
			$scope.loggedIn = true;
		};
		$scope.logout = function () {
			localStorageService.remove('username');
			$scope.loggedIn = false;
		};
		$scope.postits = [{
			//Error message
			id: 1,
			author: 'Admin',
			text: 'The post-its could not be read, please try again later!',
			status: 'admin-note',
			position: {
				x: 200,
				y: 200
			},
			removed: false,
			timestamp: $scope.date.getFullYear() + '-' + (($scope.date.getMonth() + 1 < 10) ? '0' : '') + ($scope.date.getMonth() + 1) + '-' + $scope.date.getDate()
		}];

		CRUDFactory.readPostIt(function () {
			$scope.postits = CRUDFactory.getPostIts();
		});
		$interval(function () {
			CRUDFactory.readPostIt(function () {
				var getPostits = CRUDFactory.getPostIts();
				if (getPostits.length > 0) {
					for (var i = 0; i < $scope.postits.length; i++) {
						var getPostit = getPostits[i],
							oldPostit = $scope.postits[i];

						if (oldPostit.timestamp !== getPostit.timestamp) {
							$scope.postits[i] = getPostit;
						} else if ((getPostit.position.x !== oldPostit.position.x) || (getPostit.position.y !== oldPostit.position.y)) {
							$scope.postits[i] = getPostit;
						} else if (oldPostit.status !== getPostit.status) {
							$scope.postits[i] = getPostit;
						}
					}
					if (getPostits.length > $scope.postits.length) {
						for (i = 0; i < getPostits.length - $scope.postits.length; i++) {
							$scope.postits.push(getPostits[i]);
						}
					}
				}
			});
		}, 1000);

		$scope.populatePostits = function () {
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
		};

	});