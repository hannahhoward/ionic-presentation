'use strict';

angular.module('famousAngularStarter')
  .directive('ionicTitle', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.ionicLogoTranslate = $keyframeAnimation(
      [
        [0.2, [1000, 250, 0], Easing.outBack],
        [0.3, [0, 250, 0], Easing.inOutQuad],
        [0.3, [0, 250, 0], Easing.outQuad],
        [0.4, [0, 450, 0]]
      ],
      scope.timeline);
    };

    return {
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/ionic-title.html'
    };
  });