class GameController {
  constructor(gameService) {
    'ngInject';
    this.service = gameService;
    
    this.name = 'game';
  }
  
  inProgress() {
    return this.service.inProgress;
  }
  
  start() {
    this.service.start();
    this.color = this.service.color;
  }
  
  reset() {
    this.service.reset();
  }
}

export default GameController;
