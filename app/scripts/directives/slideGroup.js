'use strict';

angular.module('famousAngularStarter')
  .directive('slideGroup', function ($famous, $keyframeAnimation) {
    return {
      restrict: 'E',
      scope: {
        src: '=',
        timeline: '='
      },
      transclude: true,
      templateUrl: 'partials/slide-group.html'
    };
  });