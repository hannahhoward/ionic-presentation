
angular.module('famousAngularStarter')
  .factory('RevealPositionSaver', function () {

    var positionsSaved = {};

    return function(name) {
      if (!positionsSaved[name]) {
        positionsSaved[name] = {h: 0, v: 0, f: undefined};
      }
      return {
        savePosition: function() {
          positionsSaved[name] = Reveal.getIndices();
        },
        restorePosition: function() {
          if (typeof(Reveal) != "undefined") {
            Reveal.slide(positionsSaved[name].h,
              positionsSaved[name].v,
              positionsSaved[name].f);
          }
        }
      };
    };
  });

