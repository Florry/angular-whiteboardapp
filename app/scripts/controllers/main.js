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
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});