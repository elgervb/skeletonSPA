class GameController {
  constructor($interval, $scope, $filter, gameService) {
    'ngInject';
    this.name = 'game';
    
    this.service = gameService;
    this.$interval = $interval;
    this.hex2rgbFilter = $filter('rgb2hex');
    debugger;
    
    this.progression = 0;
    this.inProgress = false;
    this.color = {};
    this.startTime = -1;
    this.gameEnded = false;
  }
  
  progress() {
    return ((new Date().getTime() - this.startTime) / 1000).toFixed(1);
  }
  
  update(guessColor) {
    debugger;
    this.color.guessed = this.hex2rgbFilter(guessColor);
    
    this.gameEnded = true;
    this.$interval.cancel(this.timer);
  }
  
  /**
   * Generates a new random color
   * @returns {number} a six figure hex color code
   */
  randomColor() {
    return (`000000${(Math.random() * 0xFFFFFF << 0).toString(16)}`).slice(-6);
  }
  
  start() {
    this.color.toMatch = this.randomColor();
    this.color.init = this.randomColor();
    this.color.guessed = this.color.init;
    
    this.inProgress = true;
    this.startTime = new Date().getTime();
    
    this.startTimer();
  }
  
  startTimer() {
    let interval = 100;
    this.$interval(() => {
      this.progression = this.progress();
    }, interval);
  }
  
  reset() {
    delete this.color.toMatch;
    delete this.color.init;
    this.inProgress = false;
    this.gameEnded = true;
    
    if (this.timer) {
      this.$interval.cancel(this.timer);
    }
  }
}

export default GameController;
