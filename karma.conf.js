/*jslint node: true */
"use strict";

/**
 * Karma config file
 * 
 * http://karma-runner.github.io/0.8/config/configuration-file.html
 */
module.exports = function(config) {

  function getIdentifier(){
    var d = new Date(),
    day = d.getDate(),
    month = d.getMonth()+1,
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds(),
    ms = d.getMilliseconds();
    return ""+year+(month<9?"0"+month:month)+(day<9?"0"+day:day)+"-"+(hours<9?"0"+hours:hours)+(minutes<9?"0"+minutes:minutes)+"-"+(seconds<9?"0"+seconds:seconds)+ms;
  }
  var identifier = getIdentifier();

  
  config.set({
    basePath: './',
    frameworks: [ 'jasmine' ],
    files: [
      'dist/js/vendor/vendor.js',
      'dist/js/vendor/angular-mocks.js',
      'dist/js/app.min.js',
      'dist/**/*.html',
      'tests/**/*.js',
      'dist/**/*.css'
    ],
    preprocessors: {
      './app/templates/*.html': 'ng-html2js',
      './dist/js/app.min.js': ['coverage']
    },
    reporters: [ 'progress', 'html', 'coverage' ],
    colors: true,
    browsers: [ 'PhantomJS' ], // 'Chrome', 'Crome_without_security', 'Firefox', 'IE', 'Opera', 'PhantomJS'
    htmlReporter: {
        outputFile: 'reports/'+identifier+'units.html',
        suite: 'unit'
    },
    exclude: [],
    autoWatch: true,
    autoWatchBatchDelay: 250,
    usePolling: false,
    coverageReporter: {
      type : 'html',
      dir : 'reports/'+identifier+'coverage'
    },
    customLaunchers: {
      Crome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-opera-launcher',
      'karma-jasmine',
      'karma-htmlfile-reporter',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ]
  });
};
