'use strict';

angular.module('famousAngularStarter')
  .directive('slideGroupHeader', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs, slidesCtrl) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.slideNumber = slidesCtrl.addSlide(scope);
      scope.getSlideNumber = function() {
        return (scope.slideNumber - slidesCtrl.rotate());
      }
      scope.rotateZ = function() {
        return (scope.getSlideNumber() - 1) * 3.14159 / 4.0;
      };
      scope.inverseRotateZ = function() {
        return (scope.rotateZ()* (-1));
      };
      scope.isActive = function() {
        var activeState = slidesCtrl.getActiveState();
        if ((activeState >= 0.2) && (scope.getSlideNumber().toFixed(1) == "1.0")) {
          return 0.2;
        } else {
          return activeState;
        };
      };

      var initialOpacity = $keyframeAnimation(
        [
          [scope.slideNumber-1, 0.0, Easing.inQuad],
          [scope.slideNumber, 1.0]
        ],
        slidesCtrl.currentSlide);

      scope.opacity = $keyframeAnimation(
        [
          [0.1, null, Easing.inOutQuad],
          [0.2, 1.0, Easing.inOutQuad],
          [0.3, 0.0, Easing.inOutQuad],
        ],
        scope.isActive, initialOpacity);

      scope.origin = $keyframeAnimation(
        [
          [-8, [1.0, 0.5], Easing.inOutQuad],
          [-7, [0.5, 1.0], Easing.inOutQuad],
          [-6, [0.1, 0.5], Easing.inOutQuad],
          [-4, [0.1, 0.5], Easing.inOutQuad],
          [-3, [0.5, 0.0], Easing.inOutQuad],
          [-2, [0.9, 0.5], Easing.inOutQuad],
          [0, [0.9, 0.5], Easing.inOutQuad],
          [1, [0.5, 1.0], Easing.inOutQuad],
          [2, [0.1, 0.5], Easing.inOutQuad],
          [4, [0.1, 0.5], Easing.inOutQuad],
          [5, [0.5, 0.0], Easing.inOutQuad],
          [6, [0.9, 0.5], Easing.inOutQuad],
          [8, [0.9, 0.5], Easing.inOutQuad],
          [9, [0.5, 1.0]]
        ],
        scope.getSlideNumber);

      var initialTranslate = $keyframeAnimation(
        [
          [scope.slideNumber-1, [0, 266.666, -2], Easing.outElastic],
          [scope.slideNumber, [0, 0, -2]]
        ],
        slidesCtrl.currentSlide);

      scope.translate = $keyframeAnimation(
        [
          [0.1, null, Easing.inOutQuad],
          [0.2, [0, 0, -2], Easing.inOutQuad],
          [0.3, [0, 266.666, -2], Easing.inOutQuad],
        ],
        scope.isActive, initialTranslate);
    }
    return {
      require: "^slideGroups",
      restrict: 'E',
      scope: {},
      link: link,
      transclude: true,
      templateUrl: 'partials/slide-group-header.html'
    };
  });