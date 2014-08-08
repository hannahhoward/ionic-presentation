'use strict';

angular.module('famousAngularStarter')
  .directive('whyIonicTimings', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs) {
      var Easing = $famous['famous/transitions/Easing'];
      scope.whyIonicOpacity = $keyframeAnimation(
        [
          [0.5011, 0.0, Easing.inOutQuad],
          [0.50111, 1.0, Easing.inOutQuad],
          [0.50115, 1.0, Easing.inOutQuad],
          [0.50116, 0.0]
        ],
        scope.timeline);
    }
    function controller($scope) {

      var linear = function(t) { return t; };
      this.internalTimeline = $keyframeAnimation(
        [
          [0.50111, 0.1, linear],
          [0.50112, 0.11, linear],
          [0.50113, 0.12, linear],
          [0.50114, 0.2, linear],
          [0.50115, 0.21, linear],
          [0.50116, 0.22, linear]
        ],
        $scope.timeline);
    }
    return {
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link,
      controller: controller,
      templateUrl: 'partials/why-ionic-timings.html'
    };
  });