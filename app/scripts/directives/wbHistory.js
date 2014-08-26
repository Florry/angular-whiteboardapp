'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:history
 * @description
 * # history
 */
angular.module('whiteboardApp')
  .directive('history', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the history directive');
      }
    };
  });
