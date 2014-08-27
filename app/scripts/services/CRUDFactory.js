'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function ($http) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var URL = 'http://api.beta2.se/wb-div-postits';

		return {
			updatePostIt: function (postIt) {
				$http.put(URL + '/' + postIt.id, postIt);
				console.log(postIt);
			}
		};

	});