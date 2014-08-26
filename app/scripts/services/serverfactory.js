'use strict';

/**
 * @ngdoc service
 * @name whiteboardApp.serverFactory
 * @description
 * # serverFactory
 * Factory in the whiteboardApp.
 */
angular.module('whiteboardApp')
  .factory('serverFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
