import angular from 'angular';
import uiRouter from 'angular-ui-router';
import colorpickerComponent from './colorpicker.component';
import rgb2HexFilter from './rgb2hex.filter';
import hex2RgbFilter from './hex2rgb.filter';
import hex2cmykFilter from './hex2cmyk.filter';
import hex2hslFilter from './hex2hsl.filter';

let colorpickerModule = angular.module('colorpicker', [uiRouter])
.component('colorpicker', colorpickerComponent)
.filter('hex2rgb', hex2RgbFilter)
.filter('hex2cmyk', hex2cmykFilter)
.filter('hex2hsl', hex2hslFilter)
.filter('rgb2hex', rgb2HexFilter);

export default colorpickerModule;
