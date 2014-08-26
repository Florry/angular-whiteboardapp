'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:whiteboard
 * @description
 * # whiteboard
 */
angular.module('whiteboardApp')
  .directive('whiteboard', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the whiteboard directive');
      }
    };
  });
