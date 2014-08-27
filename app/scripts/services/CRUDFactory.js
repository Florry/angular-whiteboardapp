'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function ($http) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id

		var URL = 'http://api.beta2.se/wb-div-postits';

		return {
<<<<<<< HEAD
			updatePostIt: function (postIt) {
				$http.put(URL + '/' + postIt.id, postIt);
				console.log(postIt);
=======
			updatePostit: function(postit) {
				$http.put(URL + '/' + postit.id, postit);
				console.log(postit);
>>>>>>> c207a4e2613f252476e38307594433ebdcbd10e5
			}
		};

	});