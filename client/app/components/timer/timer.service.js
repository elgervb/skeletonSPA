class TimerService {
  
  constructor($interval) {
    this.$interval = $interval;
    this.interval = 100;
    this.startTime = -1;
  }
  
  progress() {
    return ((new Date().getTime() - this.startTime) / 1000).toFixed(1);
  }
  
  start(cb) {
    this.startTime = new Date().getTime();
    this.timer = this.$interval(() => {
      if (typeof cb === 'function') {
        cb(this.progress());
      }
    }, this.interval);
  }
  
  stop() {
    if (this.timer) {
      this.$interval.cancel(this.timer);
    }
  }
  
  static factory($interval) {
    'ngInject';
    return new TimerService($interval);
  }
}

export default TimerService.factory;
