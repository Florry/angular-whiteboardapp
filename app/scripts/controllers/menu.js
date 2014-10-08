'use strict';

angular.module('whiteboardApp')
	.controller('MenuCtrl', function ($scope, $http, CRUDFactory) {
		$scope.whiteboards = [];
		$scope.editWhiteboard = [];

		(function () {
			CRUDFactory.readWhiteboards(function (data) {
				$scope.whiteboards = data;
			});
		}());

		$scope.filterWhiteboards = function (whiteboard) {
			if (whiteboard.name.match($scope.filterQuery)) {
				return true;
			} else {
				return false;
			}
		};

		$scope.removeWhiteboard = function (whiteboardId) {
			CRUDFactory.deleteWhiteboard(whiteboardId,
				function (whiteboardId) {
					var whiteboard;
					for (whiteboard in $scope.whiteboards) {
						if ($scope.whiteboards[whiteboard].id === whiteboardId) {
							delete $scope.whiteboards[whiteboard];
						}
					}
				}
			);
		};


		$scope.addWhiteboard = function () {
			if ($scope.whiteBoardNameInput !== '' && $scope.whiteBoardNameInput !== undefined) {
				var whiteboard = {
					'id': -1,
					'name': $scope.whiteBoardNameInput,
					'postits': {},
					'timestamp': ''
				};
				CRUDFactory.createWhiteboard(whiteboard, function () {
					CRUDFactory.readWhiteboards(function (data) {
						$scope.whiteboards = data;
					});
				});
			}
		};

		$scope.addWhiteboardForm = function () {
			$scope.addingWhiteboard = true;
		};

		$scope.cancelWhiteboardForm = function () {
			$scope.addingWhiteboard = false;
		};

		$scope.showEditWbForm = function (id) {
			$scope.editWhiteboard[id] = true;
		};

		$scope.hideEditWbForm = function (id) {
			$scope.editWhiteboard[id] = false;
		};

		$scope.updateWhiteboard = function (whiteboardUpdate, name) {
			if (name !== undefined && name !== '') {
				var whiteboard = {
					'id': whiteboardUpdate.id,
					'name': name,
					'postits': whiteboardUpdate.postits,
					'timestamp': ''
				};

				CRUDFactory.updateWhiteboard(whiteboard, function () {
					CRUDFactory.readWhiteboards(function (data) {
						$scope.whiteboards = data;
					});
				});
				$scope.hideEditWbForm(whiteboard.id);
			}
		};

	});