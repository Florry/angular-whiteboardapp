'use strict';

angular.module('whiteboardApp')
	.factory('CRUDFactory', function ($http) {
		var whteboardUrl = 'http://172.20.10.8:8080/ng-whiteboard-app-websocket/whiteboards';

		return {
			updateWhiteboard: function (whiteboard) {
				$http.put(whteboardUrl + '/' + whiteboard.id, whiteboard);

			},
			createWhiteboard: function (whiteboard, callback) {
				$http.post(whteboardUrl, whiteboard).success(function (data) {
					callback(data);
				});
			},
			readWhiteboards: function (callback) {
				$http.get(whteboardUrl).success(function (data) {
					callback(data);
				});
			},
			readWhiteboard: function (id, callback) {
				$http.get(whteboardUrl + '?id=' + id).success(function (data) {
					callback(data);
				});
			},
			deleteWhiteboard: function (whiteboardId, callback) {
				$http.delete(whteboardUrl + '?delete=' + whiteboardId).success(function () {
					callback(whiteboardId);
					console.log('Whiteboard was removed');
				});
			}
		};
	});