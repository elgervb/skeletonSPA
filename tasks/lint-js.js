/**
 * Lint all application javascript
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let eslint = plugins.eslint;
    let plumber = plugins.plumber;

    return gulp.src(`${settings.src}js/app/**/*.js`)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  };
};
