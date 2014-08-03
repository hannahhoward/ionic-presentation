'use strict';

angular.module('famousAngularStarter')
  .directive('slides', function ($famous, $keyframeAnimation) {
    function controller($scope) {
      var Easing = $famous['famous/transitions/Easing'];
      $scope.slides = [];
      $scope.slidesCount = 0;
      this.currentSlide = $keyframeAnimation(
        [
          [0.40, 0.0, Easing.inOutQuad],
          [0.41, 1.0, Easing.inOutQuad],
          [0.42, 2.0, Easing.inOutQuad],
          [0.43, 3.0, Easing.inOutQuad],
          [0.44, 4.0, Easing.inOutQuad],
          [0.45, 5.0, Easing.inOutQuad],
          [0.46, 6.0, Easing.inOutQuad],
          [0.47, 7.0, Easing.inOutQuad],
          [0.48, 8.0],
        ],
        $scope.timeline);
      this.addSlide = function (slide) {
        $scope.slides[$scope.slidesCount] = slide;
        $scope.slidesCount++;
        return $scope.slidesCount;
      };
    }
    return {
      restrict: 'E',
      scope: {
        timeline: "="
      },
      transclude: true,
      controller: controller,
      templateUrl: 'partials/slides.html'
    };
  });