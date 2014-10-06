'use strict';
angular.module('whiteboardApp')
	.controller('MainCtrl', function ($interval, $scope, $location, $routeParams, CRUDFactory) {
		$scope.postits = [];
		$scope.whiteboardName = '';

		$scope.goToMenu = function () {
			$location.path('#');
		};

	});