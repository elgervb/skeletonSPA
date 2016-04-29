class GameController {
  constructor($interval, $scope, gameService) {
    'ngInject';
    this.name = 'game';
    
    this.service = gameService;
    this.$interval = $interval;
    
    this.progression = 0;
    this.inProgress = false;
    this.color = {};
    this.startTime = -1;
    this.playerWon = false;
  }
  
  update(color) {
    console.log(color);
  }
  
  progress() {
    return ((new Date().getTime() - this.startTime) / 1000).toFixed(1);
  }
  
  /**
   * Generates a new random color
   * @returns {number} a six figure hex color code
   */
  randomColor() {
    return ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6);
  }
  
  hasWon() {
    if (this.color.guess && this.color.init) {
      this.playerWon = this.color.guess === this.color.init;
      if (this.playerWon && this.timer){
        this.$interval.cancel(this.timer);
      }
    }
  }
  
  start() {
    this.color.guess = this.randomColor();
    this.color.init = this.randomColor();
    
    this.inProgress = true;
    this.startTime = new Date().getTime();
    
    let interval = 100;
    this.$interval(() => {this.progression = this.progress()}, interval);
  } 
  
  reset() {
    delete this.color.guess;
    delete this.color.init;
    this.inProgress = false;
    
    if (this.timer){
      this.$interval.cancel(this.timer);
    }
  }
}

export default GameController;
