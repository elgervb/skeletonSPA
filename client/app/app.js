import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import ColorPicker from './components/colorpicker/colorpicker';
import 'normalize.css';

angular.module('app', [
  uiRouter,
  ColorPicker.name
])

.config(($locationProvider) => {
  'ngInject';
  
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
})

.component('app', AppComponent);
