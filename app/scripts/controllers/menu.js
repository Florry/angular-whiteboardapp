'use strict';

angular.module('whiteboardApp')
	.controller('MenuCtrl', function ($scope, $http, CRUDFactory) {
		$scope.whiteboards = [];

		(function () {
			CRUDFactory.setMode('menu');
			CRUDFactory.read(function (data) {
				console.log(data);
				$scope.whiteboards = data;
			});
		}());

		$scope.removeWhiteboard = function (id) {
			for (var i = 0; i < $scope.whiteboards.length; i++) {
				console.log('is ' + $scope.whiteboards[i].id + ' equal to ' + id);
				if ($scope.whiteboards[i].id === id) {
					$scope.whiteboards.splice(id, 1);
					break;
				}
			}
		};

		$scope.addWhiteboard = function () {
			var newWhiteboard = {
				'name': $scope.whiteBoardNameInput
			};
			CRUDFactory.setMode('menu');
			CRUDFactory.create(newWhiteboard,
				function success(data) {
					$scope.whiteboards.push(data);
					$scope.cancelWhiteboardForm();
				},
				function error() {
					$scope.cancelWhiteboardForm();
				});
		};

		$scope.addWhiteboardForm = function () {
			$scope.addingWhiteboard = true;
		};

		$scope.cancelWhiteboardForm = function () {
			$scope.addingWhiteboard = false;
		};
	});