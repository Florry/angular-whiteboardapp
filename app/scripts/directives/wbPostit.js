'use strict';

/**
 * @ngdoc directive
 * @name whiteboardApp.directive:postIt
 * @description
 * # postIt
 */
angular.module('whiteboardApp')
  .directive('postIt', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the postIt directive');
      }
    };
  });
