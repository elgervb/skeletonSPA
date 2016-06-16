import del from 'del';
import vinylPaths from 'vinyl-paths';
/**
 * Cleans the `dist` folder and other generated files
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = (gulp, settings) => {
  return () => {
    return gulp.src([settings.dist, settings.reports])
    .pipe(vinylPaths(del));
  };
};
