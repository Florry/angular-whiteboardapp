'use strict';

/**
 * @ngdoc function
 * @name whiteboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whiteboardApp
 */
angular.module('whiteboardApp')
	.controller('MainCtrl', function($scope, CRUDFactory) {

		$scope.postits = [{
			id: 1,
			author: 'Tom Whitemore',
			text: 'Helt automagiskt',
			status: 'not started',
			position: {
				x: 200,
				y: 23
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 2,
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
			id: 3,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 90,
				y: 30
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 4,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 45,
				y: 10
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 5,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 900,
				y: 600
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 6,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 200,
				y: 100
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 7,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 50,
				y: 52
			},
			removed: false,
			timestamp: '2014-08-32'
		}, {
			id: 8,
			author: 'Bobby Thompson',
			text: 'Plan your funeral, kid',
			status: 'not started',
			position: {
				x: 100,
				y: 90
			},
			removed: false,
			timestamp: '2014-08-32'
		}];


	});