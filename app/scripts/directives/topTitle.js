'use strict';

angular.module('famousAngularStarter')
  .directive('topTitle', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs, appContainer) {
      var Easing = $famous['famous/transitions/Easing'];

      scope.topTitleTranslate = $keyframeAnimation(
        [
          [0.0, [-2000, -266.666, 0], Easing.outBack],
          [0.1, [0, -266.666, 0], Easing.inOutQuad],
          [0.3, [0, -266.666, 0], Easing.outQuad],
          [0.4, [0, -533.333, 0]]
        ],
        scope.timeline);

      scope.opacity = appContainer.globalOpacity;
    }
    return {
      require: "^appContainer",
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/top-title.html'
    };
  });