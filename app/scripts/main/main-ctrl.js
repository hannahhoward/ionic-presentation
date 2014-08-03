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
      [0.4, 'manual', 1000],
      [0.41, 'manual', 400],
      [0.42, 'manual', 400],
      [0.43, 'manual', 400],
      [0.44, 'manual', 400],
      [0.45, 'manual', 400],
      [0.46, 'manual', 400],
      [0.47, 'manual', 400],
      [0.48, 'manual', 400]
      ]
      );

    var atomRotateXBackground = function() {
      return ((-$scope.rotation.get() / 3) % (2 * 3.14159))
    };

    var atomRotateYBackground = function() {
      return ($scope.rotation.get() % (2 * 3.14159));
    };

    var atomRotateZBackground = function() {
      return (($scope.rotation.get() * 3) % (2 * 3.14159));
    };

    $scope.atomRotateX = $keyframeAnimation(
      [
        [0.3, null, Easing.outQuad],
        [0.4, (2 * 3.14159)]
      ],
      $scope.timeline, atomRotateXBackground);

    $scope.atomRotateY = $keyframeAnimation(
      [
        [0.3, null, Easing.outQuad],
        [0.4, (2 * 3.14159)]
      ],
      $scope.timeline, atomRotateYBackground);

    $scope.atomRotateZ = $keyframeAnimation(
      [
        [0.3, null, Easing.outQuad],
        [0.4, (1.75 * 3.14159), Easing.inOutQuad],
        [0.41, (2.00 * 3.14159), Easing.inOutQuad],
        [0.42, (2.25 * 3.14159), Easing.inOutQuad],
        [0.43, (2.50 * 3.14159), Easing.inOutQuad],
        [0.44, (2.75 * 3.14159), Easing.inOutQuad],
        [0.45, (3.00 * 3.14159), Easing.inOutQuad],
        [0.46, (3.25 * 3.14159), Easing.inOutQuad],
        [0.47, (3.50 * 3.14159), Easing.inOutQuad],
        [0.48, (3.75 * 3.14159)],
      ],
      $scope.timeline, atomRotateZBackground);

    $scope.atomTranslate = $keyframeAnimation(
      [
        [0.1, [0, 0, 500], Easing.inQuad],
        [0.2, [0, 0, 0]]
      ],
      $scope.timeline);

    $scope.atomOpacity = $keyframeAnimation(
      [
        [0.1, 0, Easing.inOutQuad],
        [0.1001, 1]
      ],
      $scope.timeline);
    $scope.topTitleTranslate = $keyframeAnimation(
      [
        [0.0, [-1300, -200, 0], Easing.outBack],
        [0.1, [0, -200, 0], Easing.inOutQuad],
        [0.3, [0, -200, 0], Easing.outQuad],
        [0.4, [0, -400, 0]]
      ],
      $scope.timeline);

    $scope.ionicLogoTranslate = $keyframeAnimation(
      [
        [0.2, [1000, 250, 0], Easing.outBack],
        [0.3, [0, 250, 0], Easing.inOutQuad],
        [0.3, [0, 250, 0], Easing.outQuad],
        [0.4, [0, 450, 0]]
      ],
      $scope.timeline);

    $scope.globalTranslate = $keyframeAnimation(
      [
        [0.3, [0,0,0], Easing.outBack],
        [0.4, [0,0,250]]
      ],
      $scope.timeline);

    //run function on every tick of the Famo.us engine
    Timer.every(function(){
      var adjustedSpeed = parseFloat($scope.spinner.speed) / 1200;
      $scope.rotation.set($scope.rotation.get() + adjustedSpeed);
    }, 1);

    $scope.gridOptions = {
      dimensions: [1,2]
    };
  });
