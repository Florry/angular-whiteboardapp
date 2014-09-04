'use strict';
angular.module('whiteboardApp')
	.controller('MainCtrl', function ($interval, $scope, $location, $routeParams, CRUDFactory) {
		$scope.postits = [];
		$scope.whiteboardName = '';
		CRUDFactory.setMode('whiteboard');
		(function () {
			CRUDFactory.getWhiteBoardName($scope.whiteboardName,
				function (data) {
					for (var i = 0; i < data.length; i++) {
						console.log(data[i].name);
						if ($routeParams.whiteboardId === data[i].id + '') {
							$scope.whiteboardName = data[i].name;
							break;
						}
					}
				});
		}());

		function updatePostits(postitArray, current, iterator) {
			CRUDFactory.readPostIts(function (data) {
				postitArray = data;
			});
			current = postitArray[iterator];
		}
		$scope.goToMenu = function () {
			$interval.cancel(updateInterval);
			$location.path('#');
		};

		CRUDFactory.readPostIts(function (data) {
			$scope.postits = data;
		});
		var updateInterval =
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
							if (getPostit !== undefined && oldPostit !== undefined) {
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