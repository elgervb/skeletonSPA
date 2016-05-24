import angular from 'angular';
import timeFilter from './time.filter';
import timerService from './timer.service';

let timerModule = angular.module('timer', [])
.filter('time', timeFilter)
.service('timerService', timerService);

export default timerModule;
