class GameController {
  constructor($filter, $stateParams, timerService) {
    'ngInject';
    this.name = 'game';
    
    this.timer = timerService;
    this.hex2rgbFilter = $filter('rgb2hex');
    this.progression = 0;
    
    switch ($stateParams.level) {
    case 'easy': this.tolerance = 15; break;
    case 'hard': this.tolerance = 5; break;
    case 'impossible': this.tolerance = 1; break;
    default: this.tolerance = 10; 
    }
    this.start();
  }
  
  update() {
    if (this.diff() <= this.tolerance) {
      this.stop(true);
    }
  }
  
  diff() {
    let diffs = {
      red: Math.floor(Math.abs(((this.guessColor.red / this.color.red) * 100) - 100)),
      green: Math.floor(Math.abs(((this.guessColor.green / this.color.green) * 100) - 100)),
      blue: Math.floor(Math.abs(((this.guessColor.blue / this.color.blue) * 100) - 100))
    };
    
    let max = Math.max(diffs.red, diffs.green, diffs.blue);
    if (max > this.tolerance) {
      return max;
    }
    
    return (diffs.red + diffs.green + diffs.blue) / 3;
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
  
  lost() {
    this.stop(false);
  }
  
  stop(hasWon) {
    this.timer.stop();
    
    this.gameEnd = true;
    this.hasWon = hasWon;
  }
}

export default GameController;
