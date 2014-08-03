'use strict';

angular.module('famousAngularStarter')
  .directive('slideHeader', function ($famous, $keyframeAnimation) {
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
      scope.opacity = $keyframeAnimation(
        [
          [scope.slideNumber-1, 0.0, Easing.inQuad],
          [scope.slideNumber, 1.0]
        ],
        slidesCtrl.currentSlide);

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

      scope.translate = $keyframeAnimation(
        [
          [scope.slideNumber-1, [0, 200, -2], Easing.outElastic],
          [scope.slideNumber, [0, 0, -2]]
        ],
        slidesCtrl.currentSlide);
    }
    return {
      require: "^slides",
      restrict: 'E',
      scope: {},
      link: link,
      transclude: true,
      templateUrl: 'partials/slide-header.html'
    };
  });