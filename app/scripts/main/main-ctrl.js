'use strict';

angular.module('famousAngularStarter')
  .controller('MainCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];

    $scope.spinner = {
      speed: 50
    };
    $scope.rotateZ = new Transitionable(0);
    $scope.rotateY = new Transitionable(0);
    $scope.rotateX = new Transitionable(0);

    //run function on every tick of the Famo.us engine
    Timer.every(function(){
      var adjustedSpeed = parseFloat($scope.spinner.speed) / 1200;
      $scope.rotateZ.set($scope.rotateZ.get() + adjustedSpeed * 3);
      $scope.rotateY.set($scope.rotateY.get() + adjustedSpeed);
      $scope.rotateX.set($scope.rotateX.get() - adjustedSpeed / 3);
    }, 1);

    $scope.gridOptions = {
      dimensions: [1,2]
    };
  });
