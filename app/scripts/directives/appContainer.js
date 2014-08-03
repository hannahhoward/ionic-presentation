'use strict';

angular.module('famousAngularStarter')
  .directive('appContainer', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs) {
      var Easing = $famous['famous/transitions/Easing'];

      scope.globalTranslate = $keyframeAnimation(
      [
        [0.3, [0,0,0], Easing.outBack],
        [0.4, [0,0,250]]
      ],
      scope.timeline);

    }
    return {
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link,
      templateUrl: 'partials/app-container.html'
    };
  });