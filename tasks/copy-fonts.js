/**
 * Task for copying fonts only
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      return gulp.src(`${settings.src}fonts/**`)
      .pipe(gulp.dest(`${settings.dist}fonts`));
    };
};
