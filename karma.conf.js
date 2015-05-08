/*jslint node: true */
"use strict";

/**
 * Karma config file
 * 
 * http://karma-runner.github.io/0.8/config/configuration-file.html
 */
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: [ 'jasmine' ],
    files: [
      'dist/js/vendor/vendor.js',
      'dist/js/app.min.js',
      'dist/**/*html',
      'tests/**/*.js',
    ],
    preprocessors: {
      'app/templates/*.html': 'ng-html2js'
    },
    reporters: [ 'progress', 'html' ],
    colors: true,
    autoWatch: false,
    browsers: [ 'PhantomJS' ], // Chrome, Crome_without_security, Firefox, IE, Opera, PhantomJS
    customLaunchers: {
      Crome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },
    htmlReporter: {
        outputFile: 'reports/unit-'+getDateString()+'.html',
        suite: 'unit'
    },
    singleRun: true,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-jasmine',
      'karma-htmlfile-reporter',
      'karma-ng-html2js-preprocessor'
    ]
  });

  function getDateString(){
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

};
