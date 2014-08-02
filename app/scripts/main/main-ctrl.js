'use strict';

angular.module('famousAngularStarter')
  .controller('MainCtrl', function ($scope, $famous, $timeline, $keyframeAnimation) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var SnapTransition = $famous['famous/transitions/SnapTransition'];
    var WallTransition = $famous['famous/transitions/WallTransition'];
    var SpringTransition = $famous['famous/transitions/SpringTransition'];
    var Easing = $famous['famous/transitions/Easing'];
    Transitionable.registerMethod('snap', SnapTransition);
    Transitionable.registerMethod('wall', WallTransition);
    Transitionable.registerMethod('spring', SpringTransition);

    $scope.spinner = {
      speed: 50
    };
    $scope.rotation = new Transitionable(0);

    $scope.timeline = $timeline('top', true, 0.0,
      [
      [0.1, 'auto', 900],
      [0.2, 'manual', 900],
      [0.3, 'auto', 900],
      [0.4, 'manual', 400]
      ]
      );

    var atomRotateXBackground = function() {
      return $scope.rotation.get();
    };

    var atomRotateYBackground = function() {
      console.log(-$scope.rotation.get() / 3);
      return (-$scope.rotation.get() / 3);
    };

    var atomRotateZBackground = function() {
      return $scope.rotation.get() * 3;
    };

    $scope.atomRotateX = $keyframeAnimation(
      [
        [0.3, null, Easing.inQuad],
        [0.4, 0]
      ],
      $scope.timeline, atomRotateXBackground);

    $scope.atomRotateY = $keyframeAnimation(
      [
        [0.3, null, Easing.inQuad],
        [0.4, 0]
      ],
      $scope.timeline, atomRotateYBackground);

    $scope.atomRotateZ = $keyframeAnimation(
      [
        [0.3, null, Easing.inQuad],
        [0.4, 0]
      ],
      $scope.timeline, atomRotateZBackground);

    $scope.timelineEval = function() {
      return $scope.timeline.get();
    }

    //run function on every tick of the Famo.us engine
    Timer.every(function(){
      var adjustedSpeed = parseFloat($scope.spinner.speed) / 1200;
      $scope.rotation.set($scope.rotation.get() + adjustedSpeed);
    }, 1);

    $scope.gridOptions = {
      dimensions: [1,2]
    };
  });
