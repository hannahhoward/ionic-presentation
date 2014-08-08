'use strict';

angular.module('famousAngularStarter')
  .directive('appContainer', function ($famous, $keyframeAnimation) {
    function controller($scope) {
      var Easing = $famous['famous/transitions/Easing'];

      this.globalOpacity = $keyframeAnimation(
        [
          [0.501, 1.0, Easing.inOutQuad],
          [0.5011, 0.0, Easing.inOutQuad],
          [0.5012, 0.0, Easing.inOutQuad],
          [0.502, 1.0, Easing.inOutQuad],
          [0.511, 1.0, Easing.inOutQuad],
          [0.5111, 0.0, Easing.inOutQuad],
          [0.5112, 0.0, Easing.inOutQuad],
          [0.512, 1.0, Easing.inOutQuad],
          [0.521, 1.0, Easing.inOutQuad],
          [0.5211, 0.0, Easing.inOutQuad],
          [0.5212, 0.0, Easing.inOutQuad],
          [0.522, 1.0, Easing.inOutQuad],
          [0.531, 1.0, Easing.inOutQuad],
          [0.541, 1.0, Easing.inOutQuad],
          [0.5411, 0.0, Easing.inOutQuad],
          [0.5412, 0.0, Easing.inOutQuad],
          [0.542, 1.0, Easing.inOutQuad],
          [0.551, 1.0, Easing.inOutQuad],
          [0.5511, 0.0, Easing.inOutQuad],
          [0.5512, 0.0, Easing.inOutQuad],
          [0.552, 1.0, Easing.inOutQuad],
          [0.561, 1.0, Easing.inOutQuad],
          [0.5611, 0.0, Easing.inOutQuad],
          [0.5612, 0.0, Easing.inOutQuad],
          [0.562, 1.0, Easing.inOutQuad],
          [0.571, 1.0, Easing.inOutQuad],
          [0.5711, 0.0]
        ],
        $scope.timeline);
    };

    function link(scope, element, attrs) {
      var Easing = $famous['famous/transitions/Easing'];
      var Engine = $famous['famous/core/Engine'];

      var faAppIsolate = $famous.find("#app_container")[0];
      scope.mainContext = faAppIsolate.context;

      scope.resize = function(dimensions) {
        var width = dimensions[0];
        var height = dimensions[1];
        var idealWidth = 1920;
        var idealHeight = 1200;
        var widthRatio = width / idealWidth;
        var heightRatio = height / idealHeight;
        var scale = (widthRatio < heightRatio ? widthRatio : heightRatio);
        if (scale > 1.0) {
          scale = 1.0;
        }

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
        [0.4, [0,0,333.33], Easing.inOutQuad],
        [0.5011, [0,0,333.33], Easing.inOutQuad],
        [0.50111, [0,0,0], Easing.inOutQuad],
        [0.50117, [0,0,0], Easing.inOutQuad],
        [0.5012, [0,0,333.33]]
      ],
      scope.timeline);
    }
    return {
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: controller,
      link: link,
      templateUrl: 'partials/app-container.html'
    };
  });