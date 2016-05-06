class GameController {
  constructor($state, $filter, timerService) {
    'ngInject';
    this.name = 'game';
    
    this.timer = timerService;
    this.$state = $state;
    this.hex2rgbFilter = $filter('rgb2hex');
    this.progression = 0;
    this.color = {};
    
    this.start();
  }
  
  update(guessColor) {
    this.color.guessed = this.hex2rgbFilter(guessColor);
    this.timer.stop();
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
    
    this.timer.start((time) => {
      this.progression = time;
    });
  }
  
  giveUp() {
    this.timer.stop();
    
    this.$state.go('game.overview');
  }
}

export default GameController;
