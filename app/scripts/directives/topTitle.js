'use strict';

angular.module('famousAngularStarter')
  .directive('topTitle', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs) {
      var Easing = $famous['famous/transitions/Easing'];

      scope.topTitleTranslate = $keyframeAnimation(
        [
          [0.0, [-2600, -400, 0], Easing.outBack],
          [0.1, [0, -400, 0], Easing.inOutQuad],
          [0.3, [0, -400, 0], Easing.outQuad],
          [0.4, [0, -800, 0]]
        ],
        scope.timeline);
    }
    return {
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/top-title.html'
    };
  });