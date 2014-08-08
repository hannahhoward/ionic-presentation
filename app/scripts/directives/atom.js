'use strict';

angular.module('famousAngularStarter')
  .directive('atom', function ($famous, $timeline, $keyframeAnimation) {
    function link(scope, element, attrs, appContainer) {

      var Timer = $famous['famous/utilities/Timer'];
      var Transitionable = $famous['famous/transitions/Transitionable'];
      var Easing = $famous['famous/transitions/Easing'];
      scope.spinner = {
        speed: 50
      };

      scope.rotation = new Transitionable(0);


      var atomRotateXBackground = function() {
        return ((-scope.rotation.get() / 3) % (2 * 3.14159))
      };

      var atomRotateYBackground = function() {
        return (scope.rotation.get() % (2 * 3.14159));
      };

      var atomRotateZBackground = function() {
        return ((scope.rotation.get() * 3) % (2 * 3.14159));
      };

      scope.atomRotateX = $keyframeAnimation(
        [
          [0.3, null, Easing.outQuad],
          [0.4, (2 * 3.14159)]
        ],
        scope.timeline, atomRotateXBackground);

      scope.atomRotateY = $keyframeAnimation(
        [
          [0.3, null, Easing.outQuad],
          [0.4, (2 * 3.14159)]
        ],
        scope.timeline, atomRotateYBackground);

      scope.atomRotateZ = $keyframeAnimation(
        [
          [0.3, null, Easing.outQuad],
          [0.4, (1.75 * 3.14159), Easing.inOutQuad],
          [0.41, (1.75 * 3.14159), Easing.inOutQuad],
          [0.42, (2.00 * 3.14159), Easing.inOutQuad],
          [0.43, (2.25 * 3.14159), Easing.inOutQuad],
          [0.44, (2.50 * 3.14159), Easing.inOutQuad],
          [0.45, (2.75 * 3.14159), Easing.inOutQuad],
          [0.46, (3.00 * 3.14159), Easing.inOutQuad],
          [0.47, (3.25 * 3.14159), Easing.inOutQuad],
          [0.48, (3.50 * 3.14159), Easing.outBack],
          [0.50, (3.75 * 3.14159)]
        ],
        scope.timeline, atomRotateZBackground);

      scope.atomTranslate = $keyframeAnimation(
        [
          [0.1, [0, 0, 666.66], Easing.inQuad],
          [0.2, [0, 0, 0]]
        ],
        scope.timeline);

      scope.atomOpacity = $keyframeAnimation(
        [
          [0.1, 0, Easing.inOutQuad],
          [0.1001, null]
        ],
        scope.timeline, appContainer.globalOpacity);

      //run function on every tick of the Famo.us engine
      Timer.every(function(){
        var adjustedSpeed = parseFloat(scope.spinner.speed) / 1200;
        scope.rotation.set(scope.rotation.get() + adjustedSpeed);
      }, 1);
    }
    return {
      require: "^appContainer",
      restrict: 'E',
      scope: true,
      link: link,
      templateUrl: 'partials/atom.html'
    };
  });