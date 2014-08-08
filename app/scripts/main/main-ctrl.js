'use strict';

angular.module('famousAngularStarter')
  .controller('MainCtrl', function ($scope, $famous, $state, $globalTimeline, $keyframeAnimation) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var SnapTransition = $famous['famous/transitions/SnapTransition'];
    var WallTransition = $famous['famous/transitions/WallTransition'];
    var SpringTransition = $famous['famous/transitions/SpringTransition'];
    var Easing = $famous['famous/transitions/Easing'];
    Transitionable.registerMethod('snap', SnapTransition);
    Transitionable.registerMethod('wall', WallTransition);
    Transitionable.registerMethod('spring', SpringTransition);
    $scope.timeline = $globalTimeline;

  });
