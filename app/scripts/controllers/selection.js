'use strict';
angular.module('whiteboardApp')
	.controller('SelectionCtrl', function($location, $scope, CRUDFactory) {
		CRUDFactory.readWhiteboards(function(data) {
			$scope.whiteboards = data;
		});

		$scope.createWhiteboard = function(whiteboardName) {
			CRUDFactory.createWhiteboard({
				name: whiteboardName
			}, function(createdWhiteboard) {
				$scope.whiteboards.push(createdWhiteboard);
			});
		};

		$scope.readWhiteboard = function(whiteboardId) {
			CRUDFactory.setActiveWhiteboard(whiteboardId);
			$location.path('/whiteboard-' + whiteboardId);
		};
	});