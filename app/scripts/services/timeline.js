
angular.module('famousAngularStarter')
  .factory('$timeline', function ($famous, $state) {
    var GenericSync     = $famous['famous/inputs/GenericSync'];
    var MouseSync       = $famous['famous/inputs/MouseSync'];
    var TouchSync       = $famous['famous/inputs/TouchSync'];
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

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

    var SwipeDetector = {
      addVelocity: function(velocity) {
        this.updates += 1;
        totalVelocity = ((this.updates - 1 ) * this.averageVelocity) + velocity;
        this.averageVelocity = (totalVelocity / this.updates);
      },
      start: function(data) {
        this.threshold = 100;
        this.maxDeltaY = 100;
        this.minimumVelocity = 1;
        this.averageVelocity = 0;
        this.updates = 0;
        this.startPositionX = data.clientX;
        this.startPositionY = data.clientY;
        this.startTime = (new Date()).getTime();
      },
      update: function(data) {
        this.addVelocity(data.velocity);
      },
      end: function(data) {
        this.addVelocity(data.velocity);
        var endPositionX = data.clientX;
        var endPositionY = data.clientY;
        var deltaX = endPositionX - this.startPositionX;
        var deltaY = endPositionY - this.startPositionY;

        var isSwipe = (Math.abs(deltaX) >= this.threshold &&
          Math.abs(this.averageVelocity) >= this.minimumVelocity &&
          Math.abs(deltaY) <= this.maxDeltaY);

        if (isSwipe) {
          if (deltaX < 0) {
            if (currentTimeline) {
              currentTimeline.advance();
            }
          } else {
            if (currentTimeline) {
              currentTimeline.goBack();
            }
          }
        }
      },
      setup: function() {
        var sync = new GenericSync(
          ['mouse', 'touch'],
          {direction: GenericSync.DIRECTION_X }
        );

        Engine.pipe(sync);
        sync.on('start', this.start.bind(this));
        sync.on('update', this.update.bind(this));
        sync.on('end', this.end.bind(this));
      }
    }

    SwipeDetector.setup();

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