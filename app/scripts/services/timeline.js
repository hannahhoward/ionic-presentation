
angular.module('famousAngularStarter')
  .factory('$timeline', function ($famous) {
    var timelines = {};
    var currentTimeline = null;
    var parentTimelines = [];

    var Engine = $famous['famous/core/Engine'];
    var Transitionable = $famous['famous/transitions/Transitionable'];

    Engine.on("keydown", function (data) {
      if (currentTimeline) {
        currentTimeline.advance();
      }
    });

    Engine.on("click", function (data) {
      if (currentTimeline) {
        currentTimeline.advance();
      }
    });

    Timeline.prototype = {
      queue: function() {
        this.queuePoint +=1;
        if (this.queuePoint <= this.nextPoint) {
          return;
        }
        if (this.nextPoint >= this.points.length) {
          this.complete();
        } else if (this.points[this.nextPoint][1] == 'auto') {
          this.advance();
        } else if (this.points[this.nextPoint][1] == 'child') {
          this.switchToChild();
        }
      },
      initialize: function() {
        currentTimeline = this;
        this.transitionable.set(this.startValue);
        this.nextPoint = 0;
        this.queuePoint = 0;
        this.queue();
      },
      restart: function() {
        currentTimeline = this;
        this.queue();
      },
      complete: function() {
        if (parentTimelines.length > 0) {
          var parent = parentTimelines.pop();
          parent.restart();
        } else {
          currentTimeline = null;
        }
        this.completionCallback();
      },
      switchToChild: function() {
        var transition = this.points[this.nextPoint]
        this.nextPoint += 1;
        if (this.nextPoint < this.points.length) {
          parentTimelines.push(this)
        }
        this.transitionable.set(transition[0]);
        timelines[transition[2]].initialize();
      },
      advance: function() {
        var transition = this.points[this.nextPoint]
        this.nextPoint += 1;

        this.transitionable.set(transition[0], {duration: transition[2]}, this.queue.bind(this));
      }
    };

    function Timeline(name, isDefault, startValue, points, completionCallback) {
      this.name = name;
      this.points = points;
      this.isDefault = isDefault;
      this.startValue = startValue;
      this.completionCallback = completionCallback
      this.transitionable = new Transitionable(startValue);
    };

    return function(name, isDefault, startValue, points, completionCallback) {
      timelines[name] = new Timeline(name, isDefault, startValue, points, completionCallback)
      if (isDefault) {
        timelines[name].initialize();
      };
      return function() {
        return timelines[name].transitionable.get();
      };
    }

  });