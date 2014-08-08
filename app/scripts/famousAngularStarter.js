'use strict';

angular.module('famousAngularStarter',
  ['ngAnimate', 'ngCookies',
    'ngTouch', 'ngSanitize',
    'ngResource', 'ui.router',
    'famous.angular' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      });

    function revealState(name) {

      $stateProvider
        .state(name, {
          url: "/"+name,
          templateUrl: ('partials/'+name+'.html'),
          controller: function ($scope, RevealPositionSaver) {
            $scope.positionSaver = RevealPositionSaver(name);
            $scope.$on('$viewContentLoaded', function(event){
              $scope.positionSaver.restorePosition();
            });
          },
          onExit: function(RevealPositionSaver) {
            RevealPositionSaver(name).savePosition();
          }
        });
    };

    revealState('why-ionic');
    revealState('cordova');
    revealState('ionic-basics');
    revealState('where-it-fits');
    revealState('concerns');

    $urlRouterProvider.otherwise("/");
  })
;
