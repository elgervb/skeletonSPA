import angular from 'angular';
import uiRouter from 'angular-ui-router';
import gameComponent from './game.component';

import ColorPicker from '../colorpicker/colorpicker';

let gameModule = angular.module('game', [
  uiRouter,
  ColorPicker.name
])

.component('game', gameComponent);

export default gameModule;
