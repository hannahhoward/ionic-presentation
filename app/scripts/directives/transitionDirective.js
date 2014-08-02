'use strict';

/*function TransitionDirective = function() {
  this.restrict: 'A',
  this.scope: false,
  this.priority: 16,
}

TransitionDirective.prototype = {
  compile: function(tElement, tAttrs, transclude) {
      var Transitionable = $famous['famous/transitions/Transitionable'];
      var Easing =$famous['famous/transitions/Easing'];

      var self = this;

      return {
        pre: function(scope, element, attrs) {
        },
        post: function(scope, element, attrs) {
          $famousDecorator.ensureIsolate(scope)

          $timeout(function() {
            var duration = attrs.for;
            var curve;

            if (attrs.overShoot) {
              curve = Easing.outBack
            }
            curve = curve || 'easeInOut'
            var transitionable = new Transitionable(0);

            scope.$watch(attrs.at, function(at) {
              if (at) {
                transitionable.set(1, {duration: duration, curve: curve});
              }
            })

            self.attachTransition(scope.isolate[scope.$id].modifier, attrs, transitionable);

          });

        }
      }
    }
  }


angular.module('famousAngularStarter')
.directive('slideIn',
  ['$famous', '$famousDecorator', '$timeout',
  function ($famous, $famousDecorator, $timeout) {
    slideIn = new TransitionDirective();
    slideIn.attachTransition = function(modifier, attrs, transitionable) {

    }
  }
}]);*/