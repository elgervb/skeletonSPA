import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import Game from './components/game/game';
import homeTemplate from './components/game/home.html';

angular.module('app', [
  uiRouter,
  Game.name
])

.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      template: homeTemplate
    })
    .state('game', {
      url: '/game/:level',
      template: '<game></game>'
    });
})

.config(($locationProvider) => {
  'ngInject';
  
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
})

.component('app', AppComponent);
