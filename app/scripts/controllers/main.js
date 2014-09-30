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
		$scope.goToMenu = function () {
			$location.path('#');
		};

	});