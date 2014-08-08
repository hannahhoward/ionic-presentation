
angular.module('famousAngularStarter')
  .factory('$timeline', function ($famous, $state) {
    var timelines = {};
    var currentTimeline = null;
    var parentTimelines = [];

    var Engine = $famous['famous/core/Engine'];
    var Transitionable = $famous['famous/transitions/Transitionable'];

    Engine.on("keydown", function (data) {
      if (data.keyCode == 34 || data.keyCode == 39) {
        if (currentTimeline) {
          currentTimeline.advance();
        }
      } else if (data.keyCode == 33 || data.keyCode == 37) {
        if (currentTimeline) {
          currentTimeline.goBack();
        }
      }
    });

    Timeline.prototype = {
      queue: function() {
        if (this.mode == "reveal") {
          return;
        }
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
        } else if (this.points[this.nextPoint][1] == 'reveal') {
          this.switchToRevealMode();
        }
      },
      queueBack: function() {
        if (this.mode == "reveal") {
          return;
        }
        if (this.prevPoint < -1) {
          return;
        } else if (this.points[this.prevPoint+1][1] == 'child') {
          this.switchToChild();
        } else if (this.points[this.prevPoint+1][1] == 'reveal') {
          this.switchBackToRevealMode();
        } else if (this.points[this.prevPoint+2][1] == 'auto') {
          this.goBack();
        }
      },
      initialize: function() {
        currentTimeline = this;
        this.transitionable.set(this.startValue);
        this.nextPoint = 0;
        this.prevPoint = -2;
        this.direction = 1;
        this.queuePoint = 0;
        this.mode = 'normal';
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
        if (this.completionCallback) {
          this.completionCallback();
        }
      },
      switchToRevealMode: function() {
        this.mode = 'reveal';
        var transition = this.points[this.nextPoint]
        this.nextPoint += 1;
        this.queuePoint = this.nextPoint + 1;
        $state.go(transition[2]);
      },
      switchBackToRevealMode: function() {
        this.mode = 'reveal';
        var transition = this.points[this.prevPoint+1]
        $state.go(transition[2]);
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
        if (this.mode == 'reveal') {
          if (Reveal.isLastSlide()) {
            this.mode = 'normal';
            $state.go('home');
          } else {
            Reveal.right();
            return;
          }
        }
        if (this.direction == -1) {
          this.nextPoint = this.prevPoint+2;
          this.direction = 1;
        }
        var transition = this.points[this.nextPoint]

        if (transition[1] == 'reveal') {
          this.switchToRevealMode();
          return;
        }

        this.nextPoint += 1;
        this.transitionable.set(transition[0], {duration: transition[2]}, this.queue.bind(this));
      },
      goBack: function() {
        if (this.mode == 'reveal') {
          if (Reveal.isFirstSlide()) {
            this.mode = 'normal';
            $state.go('home');
          } else {
            Reveal.left();
            return;
          }
        }
        if (this.direction == 1) {
          this.prevPoint = this.nextPoint-2;
          this.direction = -1;
        }
        if (this.prevPoint < -1) {
          return;
        }
        if (this.prevPoint == -1) {
          var value = this.startValue;
        } else {
          var value = this.points[this.prevPoint][0]
        }
        var duration
        if (this.points[this.prevPoint+1][1] == 'reveal') {
          duration = 0;
        } else {
          duration = this.points[this.prevPoint+1][2];
        }

        this.prevPoint -= 1;

        this.transitionable.set(value, {duration: duration}, this.queueBack.bind(this));
      }
    };

    function Timeline(name, isDefault, startValue, points, completionCallback) {
      this.name = name;
      this.points = points;
      this.isDefault = isDefault;
      this.startValue = startValue;
      this.mode = 'normal';
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