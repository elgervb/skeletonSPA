import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
/**
 * Lint all application javascript
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = function (gulp, settings) {
  return function () {
    return gulp.src(`${settings.src}js/client/**/*.js`)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  };
};
