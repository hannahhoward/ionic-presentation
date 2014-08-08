'use strict';

angular.module('famousAngularStarter')
  .directive('aboutHannah', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs, timingsCtrl) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.aboutHannahOpacity = $keyframeAnimation(
        [
          [0.1, 1.0, Easing.inOutQuad],
          [0.12, 1.0, Easing.inOutQuad],
          [0.2, 0.0, Easing.inOutQuad]
        ], timingsCtrl.internalTimeline);

      scope.logoRotate = $keyframeAnimation(
        [
          [0.1, (3.14159/1.5), Easing.outBounce],
          [0.11, 0.0]
        ], timingsCtrl.internalTimeline);

      scope.nameOpacity = $keyframeAnimation(
        [
          [0.104, 0.0, Easing.inOutQuad],
          [0.107, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.nameTranslate = $keyframeAnimation(
        [
          [0.104, [-200, -100, 0], Easing.inOutQuad],
          [0.107, [-200, -200, 0]]
        ], timingsCtrl.internalTimeline);

      scope.twitterOpacity = $keyframeAnimation(
        [
          [0.105, 0.0, Easing.inOutQuad],
          [0.108, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.twitterTranslate = $keyframeAnimation(
        [
          [0.105, [-200, 100, 0], Easing.inOutQuad],
          [0.108, [-200, 0, 0]]
        ], timingsCtrl.internalTimeline);

      scope.emailOpacity = $keyframeAnimation(
        [
          [0.106, 0.0, Easing.inOutQuad],
          [0.109, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.emailTranslate = $keyframeAnimation(
        [
          [0.106, [-200, 300, 0], Easing.inOutQuad],
          [0.109, [-200, 200, 0]]
        ], timingsCtrl.internalTimeline);

    }
    return {
      require: '^whyIonicTimings',
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/about-hannah.html'
    };
  });