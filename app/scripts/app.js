'use strict';

/**
 * @ngdoc overview
 * @name whiteboardApp
 * @description
 * # whiteboardApp
 *
 * Main module of the application.
 */
angular
	.module('whiteboardApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'LocalStorageModule'
	]).config(['localStorageServiceProvider',
		function(localStorageServiceProvider) {
			localStorageServiceProvider.setPrefix('wb-div');
		}
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/selection', {
				templateUrl: 'views/selection.html',
				controller: 'SelectionCtrl'
			})
			.when('/whiteboard-:id', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/selection'
			});
	});