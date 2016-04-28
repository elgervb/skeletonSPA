class GameController {
  constructor() {
    this.name = 'game';
    this.guessColor = this.randomColor();
    this.randInitColor = `#${this.randomColor()}`;
  }
  
  /**
   * Generates a new random color
   * @returns {number} a six figure hex color code
   */
  randomColor() {
    return Math.floor(Math.random()*0xFFFFFF>>0).toString(16);
  }
}

export default GameController;
