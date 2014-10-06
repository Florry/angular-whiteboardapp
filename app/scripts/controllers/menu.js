'use strict';

angular.module('whiteboardApp')
	.controller('MenuCtrl', function($scope, $http, CRUDFactory) {
		$scope.whiteboards = [];
		$scope.editWhiteboard = [];

		(function() {
			CRUDFactory.readWhiteboard(function(data) {
				$scope.whiteboards = data;
			});
		}());

		$scope.removeWhiteboard = function(whiteboardId) {
			CRUDFactory.deleteWhiteboard(whiteboardId, function() {
				for (var i = 0; i < $scope.whiteboards.length; i++) {
					if ($scope.whiteboards.id === whiteboardId) {

					}
				}
			});
		};

		$scope.addWhiteboard = function() {

		};

		$scope.addWhiteboardForm = function() {
			$scope.addingWhiteboard = true;
		};

		$scope.cancelWhiteboardForm = function() {
			$scope.addingWhiteboard = false;
		};

		$scope.showEditWbForm = function(id) {
			$scope.editWhiteboard[id] = true;
			/*if (id === editWhiteboardId) {
				return true;
			} else {
				return false;
			}*/
		};

		$scope.hideEditWbForm = function(id) {
			$scope.editWhiteboard[id] = false;
			/*if (id === editWhiteboardId) {
				return false;
			} else {
				return true;
			}*/
		};

		$scope.updateWhiteboard = function(whiteboard) {
			CRUDFactory.updateWhiteboard(whiteboard);
		};

	});