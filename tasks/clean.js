/**
 * Cleans the `dist` folder and other generated files
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      return gulp.src([settings.dist, settings.reports])
      .pipe(plugins.vinylPaths(plugins.del));
    };
};
