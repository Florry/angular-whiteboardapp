'use strict';
angular.module('whiteboardApp')
	.controller('MainCtrl', function ($interval, $scope, $location, $routeParams, CRUDFactory) {
		$scope.whiteboardObject = {};
		$scope.postits = [];
		$scope.whiteboardName = '';
		$scope.connections = 0;

		var webSocketUrl = 'ws://' + 'localhost:8080' + '/ng-whiteboard-app-websocket/whiteboard',
			ws = new WebSocket(webSocketUrl);

		$scope.goToMenu = function () {
			$location.path('#');
			ws.close();
		};

		(function getWhiteboard() {
			CRUDFactory.readWhiteboard($routeParams.whiteboardId,
				function (data) {
					console.log(data);
					$scope.whiteboardObject = data;
					setUpWhiteBoard();
				}
			);
		}());
		ws.onopen = function () {
			ws.send('{"message":"client-update","data":{"whiteboardId":' + $scope.whiteboardObject.id + '}}');
		};

		ws.onmessage = function (message) {
			var data = JSON.parse(message.data);
			console.log(data);
			$scope.$broadcast(data.message, data.data);
		};

		$scope.$on('postit-created', function (event, data) {
			$scope.postits.put(data);
		});

		$scope.$on('postit-updated', function (event, data) {
			$scope.postits[data.id] = data;
		});

		$scope.$on('postit-removed', function (event, data) {
			delete $scope.postits[data.id];
		});

		$scope.$on('client-added', function (event, data) {

		});

		$scope.$on('connections-new', function (event, data) {
			$scope.connections = data.connections;
		});

		function setUpWhiteBoard() {
			$scope.whiteboardName = $scope.whiteboardObject.name;
			$scope.postits = $scope.whiteboardObject.postits;
		}
	});