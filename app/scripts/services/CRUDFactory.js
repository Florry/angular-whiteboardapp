'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function($http) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var URL = 'http://localhost:14782/wb-div-postits',
			postits = [];

		return {
			//C
			createPostIt: function(postIt) {
				return $http.post(URL, postIt);
			},
			//R
			readPostIt: function(callback) {
				$http({
					method: 'GET',
					url: URL + '/'
				}).
				success(function(data) {
					postits = data;
					callback();
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

			getPostIts: function() {
				// console.log(postits);
				return postits;
			}
		};

	});