'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function($http) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var baseURL = 'http://api.beta2.se',
			whiteboardSpecificURL;

		return {
			setActiveWhiteboard: function(whiteboardId) {
				whiteboardSpecificURL = 'http://api.beta2.se/wb-div-whiteboard-' + whiteboardId;
			},
			readWhiteboards: function(successCallback) {
				$http.get(baseURL + '/wb-div-whiteboards').success(function(data) {
					successCallback(data);
				});
			},
			createWhiteboard: function(whiteboardName, successCallback) {
				$http.post(baseURL + '/wb-div-whiteboards', whiteboardName).success(function(createdWhiteboard) {
					successCallback(createdWhiteboard);
				});
			},
			//C
			createPostIt: function(newPostIt, successCallback, errorCallback) {
				$http.post(whiteboardSpecificURL, newPostIt).success(function(data) {
					successCallback(data);
				}).error(function() {
					errorCallback();
				});
			},
			//R
			readPostIts: function(callback) {
				$http.get(whiteboardSpecificURL).success(function(data) {
					callback(data);
				});
			},
			//U
			updatePostIt: function(postIt) {
				$http.put(whiteboardSpecificURL + '/' + postIt.id, postIt);
				console.log(postIt + ' was updated on the server');
			},
			//D
			deletePostIt: function(postIt) {
				$http.delete(whiteboardSpecificURL + '/' + postIt);
				console.log(postIt + ' was deleted from the server');
			}
		};
	});