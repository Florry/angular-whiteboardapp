'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function ($http, $routeParams) {

		// C POST OBJ TO URL http://api.beta2.se/wb-div-postits
		// R GET OBJ FROM URL http://api.beta2.se/wb-div-postits
		// U PUT OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		// D DELETE OBJ TO URL http://api.beta2.se/wb-div-postits/:id
		var whiteboardId = $routeParams.whiteboardId,
			httpWhiteboard = 'http://api.beta2.se/wb-div-v-vg-',
			httpWhiteboards = 'http://api.beta2.se/wb-div-v-vg-menu',
			http = httpWhiteboard,
			URL = http + whiteboardId;

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
			setMode: function (mode) {
				switch (mode) {
				case 'menu':
					http = httpWhiteboards;
					URL = http;
					// console.log(http);
					break;
				case 'whiteboard':
					whiteboardId = $routeParams.whiteboardId;
					URL = httpWhiteboard + whiteboardId;
					// console.log(whiteboardId);
					break;
				default:
				}
			},
			getWhiteBoardName: function (id, callback) {
				console.log('getting whiteboard with name ' + id);
				$http.get(httpWhiteboards).success(function (data) {
					callback(data);
				});
			}
		};
	});