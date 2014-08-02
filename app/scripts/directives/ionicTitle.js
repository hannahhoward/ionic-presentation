'use strict';

angular.module('famousAngularStarter')
  .directive('ionicTitle', function ($famous) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'partials/ionic-title.html'
    };
  });