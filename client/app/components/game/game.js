import angular from 'angular';
import uiRouter from 'angular-ui-router';
import gameComponent from './game.component';
import gameService from './game.service';
import Timer from '../timer/timer';
import ColorPicker from '../colorpicker/colorpicker';

let gameModule = angular.module('game', [
  uiRouter,
  ColorPicker.name,
  Timer.name
])

.component('game', gameComponent)
.service('gameService', gameService);

export default gameModule;
