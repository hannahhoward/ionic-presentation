'use strict';

angular.module('famousAngularStarter')
  .directive('atomFace', function ($famous) {
    return {
      restrict: 'E',
      scope: {
        rotateX: '=rotateX',
        rotateY: '=rotateY',
        rotateZ: '=rotateZ',
      },
      templateUrl: 'partials/atom-face.html'
    };
  });