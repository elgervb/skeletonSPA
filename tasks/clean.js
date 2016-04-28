import del from 'del';
import vinylPaths from 'vinyl-paths';
/**
 * Cleans the `dist` folder and other generated files
 */
module.exports = (gulp, settings) => {
    return () => {
      return gulp.src([settings.dist])
      .pipe(vinylPaths(del));
    };
};
