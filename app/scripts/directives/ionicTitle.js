'use strict';

angular.module('famousAngularStarter')
  .directive('ionicTitle', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs, appContainer) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.ionicLogoTranslate = $keyframeAnimation(
      [
        [0.2, [1733.33, 333.333, 0], Easing.outBack],
        [0.3, [0, 333.333, 0], Easing.inOutQuad],
        [0.3, [0, 333.333, 0], Easing.outQuad],
        [0.4, [0, 600, 0]]
      ],
      scope.timeline);

      scope.opacity = appContainer.globalOpacity;

    };

    return {
      require: "^appContainer",
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/ionic-title.html'
    };
  });