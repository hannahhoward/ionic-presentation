'use strict';

angular.module('famousAngularStarter')
  .directive('aboutLrd', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs, timingsCtrl) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.aboutLrdOpacity = $keyframeAnimation(
        [
          [0.12, 0.0, Easing.inOutQuad],
          [0.2, 1.0, Easing.inOutQuad],
          [0.22, 1.0, Easing.inOutQuad],
          [0.3, 0.0, Easing.inOutQuad]
        ], timingsCtrl.internalTimeline);

      scope.logoRotate = $keyframeAnimation(
        [
          [0.2, (3.14159/1.5), Easing.outBounce],
          [0.21, 0.0]
        ], timingsCtrl.internalTimeline);

      scope.nameOpacity = $keyframeAnimation(
        [
          [0.204, 0.0, Easing.inOutQuad],
          [0.207, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.nameTranslate = $keyframeAnimation(
        [
          [0.204, [-200, -100, 0], Easing.inOutQuad],
          [0.207, [-200, -200, 0]]
        ], timingsCtrl.internalTimeline);

      scope.twitterOpacity = $keyframeAnimation(
        [
          [0.205, 0.0, Easing.inOutQuad],
          [0.208, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.twitterTranslate = $keyframeAnimation(
        [
          [0.205, [-200, 100, 0], Easing.inOutQuad],
          [0.208, [-200, 0, 0]]
        ], timingsCtrl.internalTimeline);

      scope.emailOpacity = $keyframeAnimation(
        [
          [0.206, 0.0, Easing.inOutQuad],
          [0.209, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.emailTranslate = $keyframeAnimation(
        [
          [0.206, [-200, 300, 0], Easing.inOutQuad],
          [0.209, [-200, 200, 0]]
        ], timingsCtrl.internalTimeline);

      scope.angularOpacity = $keyframeAnimation(
        [
          [0.201, 0.0, Easing.inOutQuad],
          [0.204, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.angularTranslate = $keyframeAnimation(
        [
          [0.200, [-800, -250, 0], Easing.inOutQuad],
          [0.204, [-800, -350, 0]]
        ], timingsCtrl.internalTimeline);

     scope.railsOpacity = $keyframeAnimation(
        [
          [0.201, 0.0, Easing.inOutQuad],
          [0.205, 1.0]
        ], timingsCtrl.internalTimeline);

      scope.railsTranslate = $keyframeAnimation(
        [
          [0.201, [-800, 200, 0], Easing.inOutQuad],
          [0.205, [-800, 100, 0]]
        ], timingsCtrl.internalTimeline);

    }
    return {
      require: '^whyIonicTimings',
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/about-lrd.html'
    };
  });