class GameController {
  constructor($state, $filter, timerService) {
    'ngInject';
    this.name = 'game';
    
    this.timer = timerService;
    this.$state = $state;
    this.hex2rgbFilter = $filter('rgb2hex');
    this.progression = 0;
    this.start();
  }
  
  update() {
    if (this.hasWon()) {
      this.stop();
    }
  }
  
  hasWon() {
    let actual = parseInt(this.color.red, 10) + parseInt(this.color.green, 10) + parseInt(this.color.blue, 10);
    let guess = parseInt(this.guessColor.red, 10) + parseInt(this.guessColor.green, 10) + parseInt(this.guessColor.blue, 10);
    return Math.abs(((guess / actual) * 100) - 100) < 10;
  }
  
  /**
   * Generates a new random rgb color
   * @returns {number} the rgb color
   */
  randomColor() {
    let generator = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return {red: generator(0, 255), green: generator(0, 255), blue: generator(0, 255)};
  }
  
  start() {
    this.guessColor = this.randomColor();
    this.color = this.randomColor();
    
    this.timer.start((time) => {
      this.progression = time;
    });
  }
  
  stop() {
    this.timer.stop();
    
    this.$state.go('game.overview');
  }
}

export default GameController;
