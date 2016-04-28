class GameService {
  constructor() {
    this.inProgress = false;
    this.color = {};
    this.startTime = -1;
  }
  
  start() {
    this.color.guess = this.randomColor();
    this.color.init = this.randomColor();
    
    this.inProgress = true;
    this.startTime = new Date().getTime();
  }
  
  progress() {
    return (new Date().getTime() - this.startTime) / 1000;
  }
  
  reset() {
    delete this.color.guess;
    delete this.color.init;
    this.inProgress = false;
  }
  
  /**
   * Generates a new random color
   * @returns {number} a six figure hex color code
   */
  randomColor() {
    return Math.floor(Math.random()*0xFFFFFF>>0).toString(16);
  }
  
  static factory() {
    'ngInject';
    return new GameService();
  }
}

export default GameService.factory;