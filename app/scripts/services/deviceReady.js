'use strict';

angular.module('angularCordovaWrapper')
  .factory('deviceReady', function () {
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
