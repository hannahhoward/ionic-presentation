'use strict';

angular.module('famousAngularStarter')
  .directive('appContainer', function ($famous, $keyframeAnimation) {
    function link(scope, element, attrs) {
      var Easing = $famous['famous/transitions/Easing'];
      var Engine = $famous['famous/core/Engine'];

      var faAppIsolate = $famous.find("#app_container")[0];
      scope.mainContext = faAppIsolate.context;

      scope.resize = function(dimensions) {
        var width = dimensions[0];
        var height = dimensions[1];
        var idealWidth = 1440;
        var idealHeight = 900;
        var widthRatio = width / idealWidth;
        var heightRatio = height / idealHeight;
        var scale = (widthRatio < heightRatio ? widthRatio : heightRatio);

        scope.globalScale = function() {
          return [scale, scale, 1];
        }
      }

      Engine.on('resize',function(){
        var dimensions = scope.mainContext.getSize();
        scope.resize(dimensions);
      });

      scope.resize(scope.mainContext.getSize())

      scope.globalTranslate = $keyframeAnimation(
      [
        [0.3, [0,0,0], Easing.outBack],
        [0.4, [0,0,250]]
      ],
      scope.timeline);

    }
    return {
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link,
      templateUrl: 'partials/app-container.html'
    };
  });