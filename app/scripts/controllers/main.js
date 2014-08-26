'use strict';

/**
 * @ngdoc function
 * @name whiteboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whiteboardApp
 */
angular.module('whiteboardApp')
	.controller('MainCtrl', function ($scope) {

		$scope.postits = [{
			id: 1,
			author: 'Tom Whitemore',
			text: 'Helt automagiskt',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Lorem ipsum',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 1,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 30,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}];
	});