'use strict';

angular.module('famousAngularStarter')
  .directive('slideGroups', function ($famous, $timeline, $keyframeAnimation) {
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
      this.rotate = $keyframeAnimation(
        [
          [0.48, 0.0, Easing.outBack],
          [0.50, 1.0, Easing.outBack],
          [0.502, 1.0, Easing.inOutQuad]/*,
          [0.51, 2.0, Easing.outBack],
          [0.512, 2.0, Easing.inOutQuad],
          [0.52, 3.0, Easing.outBack],
          [0.522, 3.0, Easing.inOutQuad],
          [0.53, 4.0, Easing.outBack],
          [0.532, 4.0, Easing.inOutQuad],
          [0.54, 5.0, Easing.outBack],
          [0.542, 5.0, Easing.inOutQuad],
          [0.55, 6.0, Easing.outBack],
          [0.552, 6.0, Easing.inOutQuad],
          [0.56, 7.0, Easing.outBack],
          [0.562, 7.0, Easing.inOutQuad],
          [0.57, 8.0]*/
        ], $scope.timeline);

      var linear = function(t) { return t; };

      this.getActiveState = $keyframeAnimation(
        [
          [0.48, 0.1, linear],
          [0.50, 0.2, linear],
          [0.501, 0.3, linear]/*
          [0.502, 0.2, linear]
          [0.51, 0.2, linear],
          [0.511, 0.3, linear],
          [0.512, 0.2, linear],
          [0.52, 0.2, linear],
          [0.521, 0.3, linear],
          [0.522, 0.2, linear],
          [0.53, 0.2, linear],
          [0.531, 0.3, linear],
          [0.532, 0.2, linear],
          [0.54, 0.2, linear],
          [0.541, 0.3, linear],
          [0.542, 0.2, linear],
          [0.55, 0.2, linear],
          [0.551, 0.3, linear],
          [0.552, 0.2, linear],
          [0.56, 0.2, linear],
          [0.561, 0.3, linear],
          [0.562, 0.2, linear],
          [0.57, 0.2, linear],
          [0.571, 0.3, linear],
          [0.572, 0.2, linear],
          [0.58, 0.2, linear]*/
        ], $scope.timeline);

      this.addSlide = function (slide) {
        $scope.slides[$scope.slidesCount] = slide;
        $scope.slidesCount++;
        return $scope.slidesCount;
      };
    }
    return {
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: controller,
      templateUrl: 'partials/slide-groups.html'
    };
  });