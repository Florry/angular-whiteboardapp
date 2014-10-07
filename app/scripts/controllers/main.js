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
			ws.close();
			$location.path('#');
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

		function setUpWhiteBoard() {
			$scope.whiteboardName = $scope.whiteboardObject.name;
			$scope.postits = $scope.whiteboardObject.postits;
		}

		ws.onopen = function () {
			var message = {
				'message': 'client-update',
				'data': {
					'whiteboardId': $scope.whiteboardObject.id
				}
			};
			ws.send(JSON.stringify(message));
		};

		ws.onmessage = function (message) {
			var data = JSON.parse(message.data);
			console.log(data);
			$scope.$broadcast(data.message, data.data);
		};

		//CLIENT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		//Create postit locally with server data
		$scope.$on('postit-created', function (event, data) {
			$scope.postits[data.id] = data;
			$scope.$apply();
		});
		//Update postit locally with server data
		$scope.$on('postit-updated', function (event, data) {
			delete $scope.postits[data.id];
			$scope.$apply();
			$scope.postits[data.id] = data;
			$scope.$apply();
		});
		//Remove postit locally to match server
		$scope.$on('postit-removed', function (event, data) {
			delete $scope.postits[data.id];
			$scope.$apply();
		});
		//Update current open connections to whiteboard
		$scope.$on('connections-new', function (event, data) {
			$scope.connections = data.connections;
			$scope.$apply();
		});

		//SERVER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		//Create postit on server
		$scope.$on('create-postit', function (event, data) {

			var message = {
				'message': 'postit-create',
				'data': data
			};
			message.data.whiteboardId = $scope.whiteboardObject.id;
			console.log(message);
			ws.send(JSON.stringify(message));
		});
		//Update postit on server
		$scope.$on('update-postit', function (event, data) {

			var message = {
				'message': 'postit-update',
				'data': data
			};

			message.data.whiteboardId = $scope.whiteboardObject.id;
			ws.send(JSON.stringify(message));
		});
		//Delete postit on server
		$scope.$on('delete-postit', function (event, data) {

			var message = {
				'message': 'postit-remove',
				'data': {
					'id': data,
					'text': '',
					'removed': true,
					'status': '',
					'author': '',
					'position': {
						'y': 0,
						'x': 0
					},
					'timestamp': '',
					'whiteboardId': $scope.whiteboardObject.id
				}
			};

			message.data.whiteboardId = $scope.whiteboardObject.id;
			console.log(message);
			ws.send(JSON.stringify(message));
		});
	});