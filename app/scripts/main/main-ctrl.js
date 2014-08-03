'use strict';

angular.module('famousAngularStarter')
  .controller('MainCtrl', function ($scope, $famous, $timeline, $keyframeAnimation) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var SnapTransition = $famous['famous/transitions/SnapTransition'];
    var WallTransition = $famous['famous/transitions/WallTransition'];
    var SpringTransition = $famous['famous/transitions/SpringTransition'];
    var Easing = $famous['famous/transitions/Easing'];
    Transitionable.registerMethod('snap', SnapTransition);
    Transitionable.registerMethod('wall', WallTransition);
    Transitionable.registerMethod('spring', SpringTransition);

    $scope.timeline = $timeline('top', true, 0.0,
      [
      [0.1, 'auto', 900],
      [0.2, 'manual', 900],
      [0.3, 'auto', 900],
      [0.4, 'manual', 1000],
      [0.41, 'auto', 400],
      [0.42, 'manual', 400],
      [0.43, 'manual', 400],
      [0.44, 'manual', 400],
      [0.45, 'manual', 400],
      [0.46, 'manual', 400],
      [0.47, 'manual', 400],
      [0.48, 'manual', 400]
      ]
      );

  });
