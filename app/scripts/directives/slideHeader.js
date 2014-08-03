'use strict';

angular.module('famousAngularStarter')
  .directive('slideHeader', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs, slidesCtrl) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.slideNumber = slidesCtrl.addSlide(scope);
      scope.rotateZ = function() {
        return (scope.slideNumber - 1) * 3.14159 / 4.0;
      };
      scope.inverseRotateZ = function() {
        return (scope.rotateZ()* (-1));
      };
      scope.opacity = $keyframeAnimation(
        [
          [scope.slideNumber-1, 0.0, Easing.inOutQuad],
          [scope.slideNumber, 1.0]
        ],
        slidesCtrl.currentSlide);
      scope.origin = function() {
        switch (scope.slideNumber) {
          case 1:
            return [0.5, 1.0];
          case 5:
            return [0.5, 0.0];
          case 2:
          case 3:
          case 4:
            return [0.0, 0.5];
          case 6:
          case 7:
          case 8:
            return [1.0, 0.5];

        }
      };
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