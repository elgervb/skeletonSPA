/**
 * Copy all Sass sources when we need them for source maps 
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let sources = settings.argv.dev ? `${settings.src}styles/**/*.scss` : '';
    return gulp.src(sources)
    .pipe(gulp.dest(`${settings.dist}css/sass`));
  };
};
