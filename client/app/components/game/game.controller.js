class GameController {
  constructor($interval, gameService) {
    'ngInject';
    this.service = gameService;
    this.$interval = $interval;
    this.progress = 0;
    this.name = 'game';
  }
  
  inProgress() {
    return this.service.inProgress;
  }
  
  start() {
    this.service.start();
    this.color = this.service.color;
    
    let interval = 100;
    this.$interval(() => {this.progress = this.service.progress()}, interval);
  }
  
  reset() {
    this.service.reset();
    if (this.timer){
      this.$interval.cancel(this.timer);
    }
  }
}

export default GameController;
