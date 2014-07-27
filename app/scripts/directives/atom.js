'use strict';

angular.module('famousAngularStarter')
  .directive('atom', function ($famous) {
    return {
      restrict: 'E',
      scope: {
        rotateX: '=rotateX',
        rotateY: '=rotateY',
        rotateZ: '=rotateZ',
      },
      templateUrl: 'partials/atom.html'
    };
  });