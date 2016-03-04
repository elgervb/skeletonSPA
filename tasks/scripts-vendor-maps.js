/**
 * Copy all vendor .js.map files to the vendor location
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let flatten = plugins.flatten;

    return gulp.src(`${settings.src}js/vendor/**/*.js.map`)
    .pipe(flatten())
    .pipe(gulp.dest(`${settings.dist}js/vendor`));
  };
};
