'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function ($http, $routeParams) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var webSocketUrl = 'ws://' + 'localhost:8080' + '/ng-whiteboard-app-websocket/whiteboard',
			whteboardUrl = "http://localhost:8080/ng-whiteboard-app-websocket/whiteboards",
			ws = new WebSocket(webSocketUrl);

		return {
			//C
			create: function (newPostIt, successCallback, errorCallback) {
				$http.post(URL, newPostIt).success(function (data) {
					successCallback(data);
				}).error(function () {
					errorCallback();
				});
			},
			//R
			read: function (callback) {
				$http.get(URL + '/').success(function (data) {
					callback(data);
				});
			},
			//U
			updatePostIt: function (postIt) {
				$http.put(URL + '/' + postIt.id, postIt);
				console.log(postIt + ' was updated on the server');
			},
			//D
			deletePostIt: function (postIt) {
				$http.delete(URL + '/' + postIt);
				console.log(postIt + ' was deleted from the server');
			},
			readWhiteboard: function () {
				$http.get(whteboardUrl + '/').success(function (data) {
					callback(data);
				});
			}
		};
	});