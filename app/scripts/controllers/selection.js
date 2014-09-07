'use strict';
angular.module('whiteboardApp')
	.controller('SelectionCtrl', function($location, $scope, CRUDFactory) {
		CRUDFactory.readWhiteboards(function success(data) {
			$scope.whiteboards = data;
		}, function error() {
			alert('List of whiteboards could not be read because of connection issues, please try again');
		});

		$scope.createWhiteboard = function(whiteboardName) {
			CRUDFactory.createWhiteboard({
				name: whiteboardName
			}, function(createdWhiteboard) {
				$scope.whiteboards.push(createdWhiteboard);
			});
		};

		$scope.readWhiteboard = function(whiteboardId) {
			$location.path('/whiteboard-' + whiteboardId);
		};
	});