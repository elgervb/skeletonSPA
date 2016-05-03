class GameController {
  constructor($interval, $state, $scope, $filter, gameService) {
    'ngInject';
    this.name = 'game';
    
    this.service = gameService;
    this.$interval = $interval;
    this.$scope = $scope;
    this.$state = $state;
    this.hex2rgbFilter = $filter('rgb2hex');
    
    this.progression = 0;
    this.color = {};
    this.startTime = -1;
    this.gameEnded = false;
    
    this.start();
  }
  
  progress() {
    return ((new Date().getTime() - this.startTime) / 1000).toFixed(1);
  }
  
  update(guessColor) {
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
    
    this.startTime = new Date().getTime();
    this.startTimer();
  }
  
  startTimer() {
    let interval = 100;
    this.$interval(() => {
      this.progression = this.progress();
    }, interval);
  }
  
  giveUp() {
    delete this.color.toMatch;
    delete this.color.init;
    this.gameEnded = true;
    
    if (this.timer) {
      this.$interval.cancel(this.timer);
    }
    
    this.$state.go('game.overview');
  }
}

export default GameController;
