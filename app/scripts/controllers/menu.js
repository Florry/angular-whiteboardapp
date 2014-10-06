'use strict';

angular.module('whiteboardApp')
	.controller('MenuCtrl', function($scope, $http, CRUDFactory) {
		$scope.whiteboards = [];

		$scope.addWhiteboard = function() {

		};

		$scope.addWhiteboardForm = function() {
			$scope.addingWhiteboard = true;
		};

		$scope.cancelWhiteboardForm = function() {
			$scope.addingWhiteboard = false;
		};

		$scope.updateWhiteboard = function(whiteboard) {
			CRUDFactory.updateWhiteboard(whiteboard);
		};

	});