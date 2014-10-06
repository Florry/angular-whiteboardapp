'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function($http, $routeParams) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var whteboardUrl = 'http://localhost:8080/ng-whiteboard-app-websocket/whiteboards';

		return {
			//C
			create: function(newPostIt, successCallback, errorCallback) {
				$http.post(URL, newPostIt).success(function(data) {
					successCallback(data);
				}).error(function() {
					errorCallback();
				});
			},
			//R
			read: function(callback) {
				$http.get(URL + '/').success(function(data) {
					callback(data);
				});
			},
			//U
			updatePostIt: function(postIt) {
				$http.put(URL + '/' + postIt.id, postIt);
				console.log(postIt + ' was updated on the server');
			},
			//D
			deletePostIt: function(postIt) {
				$http.delete(URL + '/' + postIt);
				console.log(postIt + ' was deleted from the server');
			},
			updateWhiteboard: function(whiteboard, callback) {
				$http.put(whteboardUrl, whiteboard).success(function(data) {
					callback(data);
				});
			},
			createWhiteboard: function(whiteboard, callback) {
				$http.post(whteboardUrl, whiteboard).success(function(data) {
					callback(data);
				});
			},
			readWhiteboards: function(callback) {
				$http.get(whteboardUrl).success(function(data) {
					callback(data);
				});
			},
			readWhiteboard: function(id, callback) {
				$http.get(whteboardUrl + '?id=' + id).success(function(data) {
					callback(data);
				});
			},
			deleteWhiteboard: function(whiteboardId, callback) {
				$http.delete(whteboardUrl + '?delete=' + whiteboardId).success(function() {
					callback(whiteboardId);
					console.log('Whiteboard was removed');
				});
			}
		};
	});