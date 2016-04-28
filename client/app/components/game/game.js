import angular from 'angular';
import uiRouter from 'angular-ui-router';
import gameComponent from './game.component';
import gameService from './game.service';
import timeFilter from './time.filter';

import ColorPicker from '../colorpicker/colorpicker';

let gameModule = angular.module('game', [
  uiRouter,
  ColorPicker.name
])

.component('game', gameComponent)
.service('gameService', gameService)
.filter('time', timeFilter);

export default gameModule;
