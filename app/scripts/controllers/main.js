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
		$scope.postits = [];

		function updatePostits(postitArray, current, iterator) {
			CRUDFactory.readPostIts(function (data) {
				postitArray = data;
			});
			current = postitArray[iterator];
		}

		CRUDFactory.readPostIts(function (data) {
			$scope.postits = data;
		});
		$interval(function () {
			CRUDFactory.readPostIts(function (data) {
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
	});