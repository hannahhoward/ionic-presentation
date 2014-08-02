
angular.module('famousAngularStarter')
  .directive('faKeydown', ["$parse", "$famous", function ($parse, $famous) {
    return {
      restrict: 'A',
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var Engine = $famous['famous/core/Engine'];
            if (attrs.faKeydown) {

              Engine.on("keydown", function (data) {
                var fn = $parse(attrs.faKeydown);
                fn(scope, {$event: data});
                if (!scope.$$phase){
                  scope.$apply();
                }
              });
            }
          }
        };
      }
    };
  }]);