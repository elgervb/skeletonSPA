/**
 * Checks all test scripts on code style and quality
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let eslint = plugins.eslint;
    let plumber = plugins.plumber;
    let size = plugins.size;
    
    return gulp.src(`${settings.tests}**/*.js`)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(size({title: 'Size of tests', showFiles: false}));
  };
};
